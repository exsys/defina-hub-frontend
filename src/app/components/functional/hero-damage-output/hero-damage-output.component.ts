import { Component, OnInit, Input } from '@angular/core';

import { DataStorageService } from 'src/app/services/data-storage.service';
import * as tooltipData from "../../../shared/tooltips.json";

@Component({
  selector: 'app-hero-damage-output',
  templateUrl: './hero-damage-output.component.html',
  styleUrls: ['./hero-damage-output.component.css']
})
export class HeroDamageOutputComponent implements OnInit {

  navbarList: string[] = ["1", "2", "3", "4"];
  selected = "1";

  @Input() tooltips: any = (tooltipData as any).default;

  constructor(
    readonly storage: DataStorageService,
  ) { }

  ngOnInit(): void {
  }

  changeNumber(number: string): void {
    this.selected = number;
  }
}
