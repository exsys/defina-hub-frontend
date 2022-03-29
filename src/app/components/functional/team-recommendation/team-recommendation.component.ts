import { Component, Input, OnInit } from '@angular/core';

import { FileUploadService } from 'src/app/services/file-upload.service';
import * as recommendationData from "../../../shared/recommendations.json";
import * as recommCompsData from "../../../shared/recomm-comps.json";

@Component({
  selector: 'app-team-recommendation',
  templateUrl: './team-recommendation.component.html',
  styleUrls: ['./team-recommendation.component.css']
})
export class TeamRecommendationComponent implements OnInit {

  @Input() currentTeamArray?: any; // the budget/decent/whale array
  @Input() currentView!: string // "budget"/"decent"/"whale"

  recommendations: any = (recommendationData as any).default;
  recommComps: any = (recommCompsData as any).default;
  requestBlock: number = 0;

  constructor(
    private uploader: FileUploadService,
  ) { }

  ngOnInit(): void {
    
  }

  capitalize(word: string): string {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  getCurrentPrice(team: any): string {
    return "N/A";
  }

  loadTeam(index: number): void {
    const currentArr = this.recommComps[this.currentView];
    this.uploader.loadTeamAfterRedirect(currentArr[index]);
  }

}
