import { Component, OnInit } from '@angular/core';

import * as tooltipData from "../../../../shared/tooltips.json";
import * as recommendationData from "../../../../shared/recommendations.json";

@Component({
  selector: 'app-team-recommendations',
  templateUrl: './team-recommendations.component.html',
  styleUrls: ['./team-recommendations.component.css']
})
export class TeamRecommendationsComponent implements OnInit {

  tooltips: any = (tooltipData as any).default;
  recommendations: any = (recommendationData as any).default;

  selectedView: string = "budget";

  constructor() { }

  ngOnInit(): void {
  }

  changeView(view: string): void {
    this.selectedView = view;
  }

}
