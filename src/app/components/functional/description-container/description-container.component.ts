import { Component, Input, OnInit } from '@angular/core';

import { DataStorageService } from 'src/app/services/data-storage.service';

import * as tooltipData from "../../../shared/tooltips.json";

@Component({
  selector: 'app-description-container',
  templateUrl: './description-container.component.html',
  styleUrls: ['./description-container.component.css']
})
export class DescriptionContainerComponent implements OnInit {

  @Input() tooltips: any = (tooltipData as any).default;

  constructor(
    readonly storage: DataStorageService,
  ) { }

  ngOnInit(): void {
    
  }

}
