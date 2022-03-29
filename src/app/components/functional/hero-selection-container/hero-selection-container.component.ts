import { Component, Input, OnInit, OnDestroy, ViewChildren, QueryList, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';

import { DataStorageService } from 'src/app/services/data-storage.service';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { Hero } from 'src/app/shared/hero';
import * as heroData from "../../../shared/heroes.json";
import * as passiveData from "../../../shared/passives.json";
import * as tooltipData from "../../../shared/tooltips.json";
import { SkillElementSelectorComponent } from '../skill-element-selector/skill-element-selector.component';

@Component({
  selector: 'app-hero-selection-container',
  templateUrl: './hero-selection-container.component.html',
  styleUrls: ['./hero-selection-container.component.css']
})
export class HeroSelectionContainerComponent implements OnInit, OnDestroy {

  @Output() speedUpdate = new EventEmitter<void>();
  @Input() heroNumber!: number;
  showToggle: boolean = false;
  tooltips: any = (tooltipData as any).default;
  heroList: Hero[] = (heroData as any).default.heroes;
  passiveList: any = (passiveData as any).default; // TODO: any type zu einem richtigen type machen (vllt ein interface für passive?)
  // preselect current hero (with placeholder) so there will be no error when page loads for the first time
  currentHero: Hero = {
    "name": "Select Hero",
    "image": "grey-card",
    "faction": "N/A",
    "rarity": "N/A"
  };
  currentPassiveValues: any = [{ "level": null, "atk": null, "hp": null }];
  currentPassiveLevel: any;
  minLimitAtk: number = 0;
  minLimitSC: number = 0; // Speed, Crit
  minLimitHp: number = 0;
  remainingStatPool: number = 0; // remaining stat pool
  statPool: number = 0; // the max stat pool for later calculations
  
  readonly HP_WEIGHT: number = 12; // how much HP equals to 1 stat point. currently 1 stat point = 12 HP
  readonly MAX_LEVEL: number = 40;

  // step for stats input
  stepAtk: number = 10;
  stepSpeed: number = 10;
  stepCrit: number = 10;
  stepHp: number = 100;

  // inputs
  level = new FormControl(null);
  attack = new FormControl(null);
  health = new FormControl(null);
  speed = new FormControl(null);
  crit = new FormControl(null);

  // subscription for team upload
  private teamFileSubscription?: Subscription;

  // skill elements
  @ViewChildren(SkillElementSelectorComponent) skillElements?: QueryList<SkillElementSelectorComponent>;

  constructor(
    private storage: DataStorageService,
    private uploader: FileUploadService,
  ) { }

  ngOnInit(): void {
    this.teamFileSubscription = this.uploader.teamFileSubject$.subscribe(team => {
      if (team !== null) {
        // iterate through uploaded team
        for (let i = 0; i < team.length; i++) {
          // if same index select hero and change values
          if (team[i].index === this.heroNumber) {
            for (let hero of this.heroList) {
              // search for hero in heroes.json
              if (hero.image === team[i].name) {
                // select hero
                this.selectHero(hero);

                // change passive
                if (team[i].passive) {
                  let levelObj = {
                    level: "Level " + team[i].passive,
                    index: team[i].passive - 1
                  }
                  this.currentPassiveLevel = levelObj;
                  this.changeStats(this.currentPassiveValues[levelObj.index], "passive");
                }

                // change level
                if (team[i].level) {
                  this.level.setValue(team[i].level);
                  this.changeLevel();
                }

                // set all stats
                if (team[i].attack) {
                  this.attack.setValue(team[i].attack);
                }
                if (team[i].health) {
                  this.health.setValue(team[i].health);
                }
                if (team[i].speed) {
                  this.speed.setValue(team[i].speed);
                }
                if (team[i].crit) {
                  this.crit.setValue(team[i].crit);
                }
                this.changeStatPool();
                for (let key of ["attack", "health", "speed", "crit"]) {
                  if (team[i][key]) this.changeStats(team[i][key], key);
                }
              }
            }
          }
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.teamFileSubscription?.unsubscribe();
  }

  toggleVisibility(): void {
    this.showToggle = !this.showToggle;
  }

  selectHero(hero: Hero): void {
    this.currentHero = hero;
    this.showToggle = false;

    // hero and index in team array
    this.storage.changeTeam(hero, this.heroNumber);

    // recalculate damage output after hero change (because of faction bonus)
    this.storage.calcDamageOutputAll();

    // passive list for current hero rarity
    this.currentPassiveValues = this.passiveList["passive" + this.currentHero.rarity];
    this.currentPassiveLevel = { level: "Level 1", index: 0 };
    this.changeStats(this.currentPassiveValues[0], "passive");

    // update stats after hero change too so stats can be recalculated (because new rarity)
    this.changeLevel(true);
  }

  changeLevel(heroChange: boolean = false): void {
    // set level to 1 if hero was selected before changing level. Also so no invalid levels can be selected
    if (this.level.value < 1) this.level.setValue(1);
    if (this.level.value > this.MAX_LEVEL) this.level.setValue(this.MAX_LEVEL);

    this.storage.changeStats(this.level.value, "level", this.heroNumber);

    // min/max limits for stats depending on current rarity
    this.setStatLimits(this.currentHero.rarity);

    /* if level is changed then dont change values (only if min > value)
    if hero is changed stat values will be changed to levels min value.*/
    if (!heroChange) {
      if (this.attack.value <= this.minLimitAtk) {
        this.attack.setValue(this.minLimitAtk);
        this.changeStats(this.minLimitAtk, "attack");
      }
      if (this.speed.value <= this.minLimitSC) {
        this.speed.setValue(this.minLimitSC);
        this.changeStats(this.minLimitSC, "speed");
      }
      if (this.crit.value <= this.minLimitSC) {
        this.crit.setValue(this.minLimitSC);
        this.changeStats(this.minLimitSC, "crit");
      }
      if (this.health.value <= this.minLimitHp) {
        this.health.setValue(this.minLimitHp);
        this.changeStats(this.minLimitHp, "health");
      }
    } else {
      this.attack.setValue(this.minLimitAtk);
      this.speed.setValue(this.minLimitSC);
      this.crit.setValue(this.minLimitSC);
      this.health.setValue(this.minLimitHp);
      this.changeStats(this.minLimitAtk, "attack");
      this.changeStats(this.minLimitSC, "speed");
      this.changeStats(this.minLimitSC, "crit");
      this.changeStats(this.minLimitHp, "health");
    }

    // always recalculate stat pool after changing level so correct remaining points will be shown
    this.changeStatPool();
  }

  changeStats(value: number, inputName: string): void {
    this.storage.changeStats(value, inputName, this.heroNumber);
    // recalculate damage output if atk value has changed
    if (inputName === "attack") {
      this.storage.calcDamageOutput("basicAtk", this.heroNumber);
      this.storage.calcDamageOutput("skillAtk", this.heroNumber);
      this.storage.calcDamageOutput("hyperAtk", this.heroNumber);
    }
    // recalculate if lightning totem passive selected and crit is changed
    if (inputName === "crit" && this.storage.teamComp[this.heroNumber]?.elements?.passive?.name === "Lightning Totem") {
      this.storage.calcDamageOutput("basicAtk", this.heroNumber);
      this.storage.calcDamageOutput("skillAtk", this.heroNumber);
      this.storage.calcDamageOutput("hyperAtk", this.heroNumber);
    }

    if (inputName === "speed") {
      // if speed is fast enough for elements then recheck them
      if (this.speed.value + this.storage.getWindMainSpeed() >= 90 + this.level.value * 18) {
        this.skillElements?.toArray().forEach(skillElement => {
          skillElement.checkRequirement();
        });
      }
    }
  }

  changeStatPool(): void {
    // dont allow user to enter values below min limit
    if (this.attack.value < this.minLimitAtk) {
      this.attack.setValue(this.minLimitAtk);
      this.changeStats(this.minLimitAtk, "attack");
    }
    if (this.speed.value < this.minLimitSC) {
      this.speed.setValue(this.minLimitSC);
      this.changeStats(this.minLimitSC, "speed");
    }
    if (this.crit.value < this.minLimitSC) {
      this.crit.setValue(this.minLimitSC);
      this.changeStats(this.minLimitSC, "crit");
    }
    if (this.health.value < this.minLimitHp) {
      this.health.setValue(this.minLimitHp);
      this.changeStats(this.minLimitHp, "health");
    }

    // passive multiplier
    let passiveAtk: number = this.storage.getPassiveAtkMultiplier(this.heroNumber);
    let passiveHp: number = this.storage.getPassiveHpMultiplier(this.heroNumber);
    // attack and hp value without the passive bonus
    let atkAfterPassive: number = Math.ceil(this.attack.value / passiveAtk);
    let hpAfterPassive: number = Math.ceil(this.health.value / passiveHp);

    // recalculate the remaining stat pool depending on the current input values
    let inputCombined: number;
    if (atkAfterPassive + this.speed.value + this.crit.value + Math.floor(hpAfterPassive / this.HP_WEIGHT) < 4 * this.minLimitSC) {
      inputCombined = 0;
    } else {
      inputCombined = (atkAfterPassive + this.speed.value + this.crit.value + Math.floor(hpAfterPassive / this.HP_WEIGHT)) - 4 * this.minLimitSC;
    }
    this.remainingStatPool = this.statPool - inputCombined;

    this.changeSteps();
  }

  getAtkMinLimit(): number {
    let multiplier: number = this.storage.getPassiveAtkMultiplier(this.heroNumber);

    let min: number;
    if (this.currentHero.rarity === "S") {
      min = Math.floor(Math.ceil(48 + this.level.value * 9.6) * multiplier);
    } else {
      min = Math.floor(this.minLimitSC * multiplier);
    }

    return min;
  }

  getHpMinLimit(): number {
    let multiplier: number = this.storage.getPassiveHpMultiplier(this.heroNumber);

    let min: number;
    if (this.currentHero.rarity === "S") {
      min = Math.floor(((48 + this.level.value * 9.6) * this.HP_WEIGHT) * multiplier);
    } else {
      min = Math.floor((this.minLimitSC * this.HP_WEIGHT) * multiplier);
    }

    return min;
  }

  recalculateStats(): void {

    this.minLimitAtk = this.getAtkMinLimit();
    this.minLimitHp = this.getHpMinLimit();

    // change input values if they are below min
    if (this.attack.value < this.minLimitAtk) this.attack.setValue(this.minLimitAtk);
    if (this.health.value < this.minLimitHp) this.health.setValue(this.minLimitHp);

    // change stats in storage too so overview also recalculates stats
    this.changeStats(this.attack.value, "attack");
    this.changeStats(this.health.value, "health");

    this.changeStatPool();
  }

  updateRequirement(): void {
    this.speedUpdate.next();
  }

  // checks if speed requirement is met
  recheckSpeedRequirement(): void {
    this.skillElements?.toArray().forEach(skillElement => {
      skillElement.checkRequirement();
    });
  }

  // TODO: check if this function can somehow be made smaller/more efficient (spoiler: yes it can be made smaller)
  // calculate the stat pool and the min/max limits based on rarity and level of the hero.
  setStatLimits(rarity: string): void {
    let atkMult: number = this.storage.getPassiveAtkMultiplier(this.heroNumber);
    let hpMult: number = this.storage.getPassiveHpMultiplier(this.heroNumber);

    switch (rarity) {
      case "A":
        // stat pool
        this.statPool = 80 + this.level.value * 16;
        this.remainingStatPool = this.statPool;
        // min
        this.minLimitSC = 40 + this.level.value * 8;
        this.minLimitAtk = Math.floor(this.minLimitSC * atkMult);
        this.minLimitHp = Math.floor((this.minLimitSC * this.HP_WEIGHT) * hpMult);
        break;
      case "S":
        // in case of S heroes we use a for loop to iterate up to the provided level and add the current pattern value
        // ps: who da faq decided its a good idea to use such a formula for S heroes?!
        let pattern: number[] = [17.6, 21.6, 17.6, 17.6, 21.6];
        let result: number = 117.6;
        let temp: number = 0;

        // stat pool
        for (let i = 1; i < this.level.value; i++) {
          result += pattern[(i - 1) % pattern.length];
        }
        this.statPool = Math.floor(Math.round(result * 100) / 100);
        this.remainingStatPool = this.statPool;

        // min
        temp = 48 + this.level.value * 9.6;
        this.minLimitHp = Math.floor((temp * this.HP_WEIGHT) * hpMult);
        this.minLimitSC = Math.floor(temp);
        this.minLimitAtk = Math.floor(this.minLimitSC * atkMult);
        break;
      case "SS":
        // stat pool
        this.statPool = 120 + this.level.value * 24;
        this.remainingStatPool = this.statPool;
        // min
        this.minLimitSC = 60 + this.level.value * 12;
        this.minLimitAtk = Math.floor(this.minLimitSC * atkMult);
        this.minLimitHp = Math.floor((this.minLimitSC * this.HP_WEIGHT) * hpMult);
        break;
      case "SSS":
        // stat pool
        this.statPool = 160 + this.level.value * 32;
        this.remainingStatPool = this.statPool;
        // min
        this.minLimitSC = 80 + this.level.value * 16;
        this.minLimitAtk = Math.floor(this.minLimitSC * atkMult);
        this.minLimitHp = Math.floor((this.minLimitSC * this.HP_WEIGHT) * hpMult);
        break;
      default:
        // in case level is changed when placeholder card is still selected
        this.minLimitSC = 0;
        this.minLimitHp = 0;
        this.minLimitAtk = 0;
        this.statPool = -1; // for later checking purposes
        break;

      // can't I just check here if S or not and then initialize all max limits once? (return in default then)
    }
  }

  // change step (input number) value dynamically so people will be able to get to max stat without typing.
  /* reason for this is that if for example step is 10 and current value is less than 10 away from max limit then html doesnt increase
  // the value anymore after pressing on the increase button (arrow top). The value stays the same instead of just changing the value
  // to max limit. */
  changeSteps(): void {
    if (this.attack.value - this.minLimitAtk <= 10) {
      this.stepAtk = 1
    } else {
      this.stepAtk = 10;
    }
    if (this.speed.value - this.minLimitSC <= 10) {
      this.stepSpeed = 1
    } else {
      this.stepSpeed = 10;
    }
    if (this.crit.value - this.minLimitSC <= 10) {
      this.stepCrit = 1
    } else {
      this.stepCrit = 10;
    }
    if (this.health.value - this.minLimitHp <= 10) {
      this.stepHp = 10
    } else {
      this.stepHp = 100;
    }
  }

  close(): void {
    this.showToggle = false;
  }
}