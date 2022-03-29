import { Component, OnInit } from '@angular/core';

import * as elementData from "../../../../shared/current-tier-list.json";
import { TierListElement } from 'src/app/shared/tier-list-element';

@Component({
  selector: 'app-elements-tier-list',
  templateUrl: './elements-tier-list.component.html',
  styleUrls: ['./elements-tier-list.component.css']
})
export class ElementsTierListComponent implements OnInit {

  tierListElements: any = (elementData as any).default;

  selectedView: string = "basic";

  currAoeRanking: TierListElement[] = this.tierListElements.basic.aoe;
  currSingleRanking: TierListElement[] = this.tierListElements.basic.single;
  currRanking?: TierListElement[];

  constructor() { }

  ngOnInit(): void {
  }

  changeView(view: string): void {
    this.selectedView = view;

    if(view === "basic") {
      this.currAoeRanking = this.tierListElements.basic.aoe;
      this.currSingleRanking = this.tierListElements.basic.single;
    }
    if(view === "skill") {
      this.currAoeRanking = this.tierListElements.skill.aoe;
      this.currSingleRanking = this.tierListElements.skill.single;
    }
    if(view === "passive") {
      this.currRanking = this.tierListElements.passive;
    }
  }

}
