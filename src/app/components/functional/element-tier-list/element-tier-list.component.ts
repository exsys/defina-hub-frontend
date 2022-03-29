import { Component, Input, OnInit } from '@angular/core';

import * as elementData from "../../../shared/elements.json";
import * as tooltipData from "../../../shared/tooltips.json";
import { TierListElement } from 'src/app/shared/tier-list-element';
import { SkillElement } from 'src/app/shared/skill-element';

@Component({
  selector: 'app-element-tier-list',
  templateUrl: './element-tier-list.component.html',
  styleUrls: ['./element-tier-list.component.css']
})
export class ElementTierListComponent implements OnInit {

  tooltips: any = (tooltipData as any).default;

  // from elements.json
  elementList: SkillElement[] = (elementData as any).default.skill;

  @Input() isPassive!: boolean;

  @Input() currAoeRanking?: any;
  @Input() currSingleRanking?: any;
  @Input() currRanking?: any; // in case passive is selected (passive table only has one column)

  showModal: boolean = false;
  modalName: string = "";
  modalRanking: string = "";
  modalDescription: string = "";
  modalNotes: string = "";

  constructor() { }

  ngOnInit(): void {
  }

  showElementInfo(element: TierListElement): void {
    this.modalName = element.name;
    this.modalRanking = element.ranking;
    this.modalDescription = this.getElementDescription(element.name);
    this.modalNotes = element.notes;

    this.showModal = !this.showModal;
  }

  close(): void {
    this.showModal = false;
  }

  getElementDescription(elementName: string): string {
    if(!this.isPassive) {
      const currElem = this.elementList.find(skillelement => skillelement.name === elementName);
      
      if(currElem) return currElem.descrAttack;
      return "N/A";
    } else {
      const currElem = this.elementList.find(skillelement => skillelement.name === elementName);
      
      if(currElem) return currElem.descrPassive;
      return "N/A";
    }
  }
}
