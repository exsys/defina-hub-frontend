import { Component, Input, OnInit } from '@angular/core';

import { DataStorageService } from 'src/app/services/data-storage.service';

@Component({
  selector: 'app-hero-overview',
  templateUrl: './hero-overview.component.html',
  styleUrls: ['./hero-overview.component.css']
})
export class HeroOverviewComponent implements OnInit {

  @Input() heroNumber!: number;

  private HP_WEIGHT: number = 12;

  constructor(
    readonly storage: DataStorageService,
  ) { }

  ngOnInit(): void {
  }

  getStatAllocation(stat: string): number {
    let rarity = this.storage.team[this.heroNumber].rarity;
    let level: number | undefined = 1;
    /* % allocation for current stat will only be shown in frontend when this.storage.teamComp[this.heroNumber][stat] 
    is already initialized, so there will be no error when declaring "as number" without if-statement like the other declarations*/
    let currStat = this.storage.teamComp[this.heroNumber][stat] as number;

    // to ensure that there will be no error when current stat isnt initialized yet
    if (this.storage.teamComp[this.heroNumber].level !== undefined) {
      level = this.storage.teamComp[this.heroNumber].level as number;
    }

    // TODO: nur einen einzigen min wert mit switch durchlaufen lassen und am ende ein einziges mal eine formel haben zum ausrechnen (nach switch)
    // for each rarity there is a different formula so we have to switch the rarity
    if (stat === "attack") {
      switch (rarity) {
        case "A":
          const minA: number = 40 + level * 8;
          return Math.floor((((this.storage.getAtkWithoutPassive(this.heroNumber) - minA) / (minA * 2)) * 2) * 100);
        case "S":
          const minS: number = Math.floor(48 + level * 9.6);
          const maxS: number = Math.ceil((48 + level * 9.6) * 2);
          if (Math.floor((((this.storage.getAtkWithoutPassive(this.heroNumber) - minS) / maxS) * 2) * 100) > 100) {
            return 100;
          } else {
            return Math.floor((((this.storage.getAtkWithoutPassive(this.heroNumber) - minS) / maxS) * 2) * 100);
          }
        case "SS":
          const minSS: number = 60 + level * 12;
          return Math.floor((((this.storage.getAtkWithoutPassive(this.heroNumber) - minSS) / (minSS * 2)) * 2) * 100);
        case "SSS":
          const minSSS: number = 80 + level * 16;
          return Math.floor((((this.storage.getAtkWithoutPassive(this.heroNumber) - minSSS) / (minSSS * 2)) * 2) * 100);
      }
    } else if (stat === "speed" || stat === "crit") {
      switch (rarity) {
        case "A":
          const minA: number = 40 + level * 8;
          return Math.floor((((currStat - minA) / (minA * 2)) * 2) * 100);
        case "S":
          const minS: number = Math.floor(48 + level * 9.6);
          const maxS: number = Math.ceil((48 + level * 9.6) * 2);
          if(Math.floor((((currStat - minS) / maxS) * 2) * 100) > 100) {
            return 100;
          } else {
            return Math.floor((((currStat - minS) / maxS) * 2) * 100);
          }
        case "SS":
          const minSS: number = 60 + level * 12;
          return Math.floor((((currStat - minSS) / (minSS * 2)) * 2) * 100);
        case "SSS":
          const minSSS: number = 80 + level * 16;
          return Math.floor((((currStat - minSSS) / (minSSS * 2)) * 2) * 100);
      }
    } else {
      // Calculation for HP
      switch (rarity) {
        case "A":
          const minHpA = (40 + level * 8) * this.HP_WEIGHT;
          return Math.floor((((this.storage.getHpWithoutPassive(this.heroNumber) - minHpA) / (minHpA * 2)) * 2) * 100);
        case "S":
          const minHpS = Math.floor((48 + level * 9.6) * this.HP_WEIGHT);
          const maxHpS: number = Math.ceil((48 + level * 9.6) * 2 * this.HP_WEIGHT);
          if(Math.floor((((this.storage.getHpWithoutPassive(this.heroNumber) - minHpS) / maxHpS) * 2) * 100) > 100) {
            return 100;
          } else {
            return Math.floor((((this.storage.getHpWithoutPassive(this.heroNumber) - minHpS) / maxHpS) * 2) * 100);
          }
        case "SS":
          const minHpSS = (60 + level * 12) * this.HP_WEIGHT;
          return Math.floor((((this.storage.getHpWithoutPassive(this.heroNumber) - minHpSS) / (minHpSS * 2)) * 2) * 100);
        case "SSS":
          const minHpSSS = (80 + level * 16) * this.HP_WEIGHT;
          return Math.floor((((this.storage.getHpWithoutPassive(this.heroNumber) - minHpSSS) / (minHpSSS * 2)) * 2) * 100);
      }
    }

    return 0; // is only the case when rarity isnt "A", "S", "SS" or "SSS". (so basically it should never reach this line)
  }

  getCorrectAtk(): number | undefined {
    if (this.storage.teamComp[this.heroNumber].passive?.atk === undefined) return undefined;

    return this.storage.getAtkWithoutPassive(this.heroNumber);
  }

  getCorrectHp(): number | undefined {
    if (this.storage.teamComp[this.heroNumber].passive?.hp === undefined) return undefined;

    return this.storage.getHpWithoutPassive(this.heroNumber);
  }
}
