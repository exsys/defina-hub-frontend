import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { DataStorageService } from 'src/app/services/data-storage.service';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { Hero } from 'src/app/shared/hero';
import * as heroData from "../../../shared/heroes.json";

@Component({
  selector: 'app-skill-dropdown',
  templateUrl: './skill-dropdown.component.html',
  styleUrls: ['./skill-dropdown.component.css']
})
export class SkillDropdownComponent implements OnInit, OnDestroy {

  dropdownList: any[] = [
    {level: "Level 1", index: 0},
    {level: "Level 2", index: 1},
    {level: "Level 3", index: 2}, 
    {level: "Level 4", index: 3},
    {level: "Level 5", index: 4},
    {level: "Level 6", index: 5}
  ];
  selectedLevel?: any;
  @Input() skillValues: any; // skills from heroes.json
  @Input() heroNumber!: number;
  @Input() skillType!: string; // basicAtk/skillAtk/hyperAtk

  showToggle: boolean = false;
  heroList: Hero[] = (heroData as any).default.heroes;

  // subscription for team upload
  private teamFileSubscription?: Subscription;

  constructor(
    readonly storage: DataStorageService,
    private uploader: FileUploadService,
  ) { }

  ngOnInit(): void {
    this.teamFileSubscription = this.uploader.teamFileSubject$.subscribe(team => {
      if(team !== null) {
        // iterate through uploaded team
        for (let i = 0; i < team.length; i++) {
          // if same index change all skills
          if(team[i].index === this.heroNumber) {
            // get current hero because we need first to initialize this.skillValues.
            for (let hero of this.heroList) {
              // search for hero in heroes.json
              if(hero.image === team[i].name) {
                // select only corresponding skills that were saved in file 
                if(team[i].basicAtk && this.skillType === "basicAtk") {
                  this.skillValues = hero.basicAtk;
                  this.selectSkill(this.dropdownList[team[i].basicAtk - 1]);
                }
                if(team[i].skillAtk && this.skillType === "skillAtk") {
                  this.skillValues = hero.skillAtk;
                  this.selectSkill(this.dropdownList[team[i].skillAtk - 1]);
                }
                if(team[i].hyperAtk && this.skillType === "hyperAtk") {
                  this.skillValues = hero.hyperAtk;
                  this.selectSkill(this.dropdownList[team[i].hyperAtk - 1]);
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

  selectSkill(level: any): void {
    // if skill level is selected before hero is selected do nothing
    if(!this.storage.team[this.heroNumber]) {
      this.showToggle = false;
      return;
    }
    this.selectedLevel = level;
    this.showToggle = false;

    let currSkill = {
      level: level.index + 1,
      damage: this.skillValues.damage[level.index],
      type: this.skillValues.type,
      scalingSource: this.skillValues.scalingSource
    }

    this.storage.changeSkill(currSkill, this.skillType, this.heroNumber);
    this.storage.calcDamageOutput(this.skillType, this.heroNumber);
  }

  toggleVisibility(): void {
    this.showToggle = !this.showToggle;
  }

  close(): void {
    this.showToggle = false;
  }

}
