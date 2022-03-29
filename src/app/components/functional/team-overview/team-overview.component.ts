import { Component, OnInit, Input } from '@angular/core';

import { DataStorageService } from 'src/app/services/data-storage.service';

import * as tooltipData from "../../../shared/tooltips.json";

@Component({
  selector: 'app-team-overview',
  templateUrl: './team-overview.component.html',
  styleUrls: ['./team-overview.component.css']
})
export class TeamOverviewComponent implements OnInit {

  @Input() tooltips: any = (tooltipData as any).default;

  constructor(
    readonly storage: DataStorageService,
  ) { }

  ngOnInit(): void {
  }

}
