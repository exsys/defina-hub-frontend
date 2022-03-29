import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { SkillElement } from 'src/app/shared/skill-element';
import { DataStorageService } from 'src/app/services/data-storage.service';
import { FileUploadService } from 'src/app/services/file-upload.service';
import * as elementData from "../../../shared/elements.json";

@Component({
  selector: 'app-skill-element-selector',
  templateUrl: './skill-element-selector.component.html',
  styleUrls: ['./skill-element-selector.component.css']
})
export class SkillElementSelectorComponent implements OnInit, OnDestroy {

  @Input() heroNumber!: number;
  @Input() skillType!: string; // passive/basic/skill/hyper

  elementList: SkillElement[] = (elementData as any).default.skill;
  currentElement?: SkillElement;
  showToggle: boolean = false;
  requirementNotMet: boolean = false;

  // subscription for team upload
  private teamFileSubscription?: Subscription;

  constructor(
    private storage: DataStorageService,
    private uploader: FileUploadService,
  ) { }

  ngOnInit(): void {
    this.teamFileSubscription = this.uploader.teamFileSubject$.subscribe(team => {
      if (team !== null) {
        // iterate through uploaded team
        for (let i = 0; i < team.length; i++) {
          // if same index select correct skill element
          if (team[i].index === this.heroNumber) {
            for (let element of this.elementList) {
              if (element.name === team[i][this.skillType + "Element"]) {
                this.selectElement(element);
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

  // send currentElement to storage
  changeDescription(): void {
    if (this.skillType !== "passive") {
      this.storage.changeDescription(this.currentElement, this.currentElement!.descrAttack, this.heroNumber, this.skillType);
    } else {
      this.storage.changeDescription(this.currentElement, this.currentElement!.descrPassive, this.heroNumber, this.skillType);
    }
  }

  selectElement(element: SkillElement): void {
    this.currentElement = element;
    this.showToggle = false;

    this.checkRequirement();

    this.storage.changeElement(this.currentElement, this.skillType, this.heroNumber);
    this.storage.calcDamageOutput(this.skillType + "Atk", this.heroNumber);
  }

  checkRequirement(): void {
    // if element also has a requirement then check that requirement first
    if (this.currentElement?.requirement) {
      // type = 0 means speed requirement (90 + 18 * level).
      if (this.currentElement.requirement.type === 0) {
        let isAttackSkill: boolean = (this.skillType === "basic" || this.skillType === "skill" || this.skillType === "hyper");
        let minSpeed: number = (90 + 18 * (this.storage.teamComp[this.heroNumber]?.level || 0));
        let windMainSpeed: number = this.storage.getWindMainSpeed();
        let requNotMet: boolean = (this.storage.teamComp[this.heroNumber].speed || 0) + windMainSpeed < minSpeed;

        // if skill is basic/skill/hyper else if passive
        if (this.currentElement.requirement.skill === "attack" && isAttackSkill) {
          if (requNotMet) {
            this.requirementNotMet = true;
          } else {
            this.requirementNotMet = false;
            this.storage.clearRequirement();
          }
        } else if (this.currentElement.requirement.skill === "passive" && this.skillType === "passive") {
          if (requNotMet) {
            this.requirementNotMet = true;
          } else {
            this.requirementNotMet = false;
            this.storage.clearRequirement();
          }
        } else {
          this.requirementNotMet = false;
        }
      }
    } else {
      this.requirementNotMet = false;
    }
  }

  getImageName(element: string): string {
    if (element === "none") return "empty-element";
    return element.split(" ").join("-").toLowerCase();
  }

  close(): void {
    this.showToggle = false;
  }

}
