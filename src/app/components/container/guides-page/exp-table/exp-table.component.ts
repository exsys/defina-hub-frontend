import { Component, OnInit } from '@angular/core';

import * as expData from "../../../../shared/exp-table.json";

@Component({
  selector: 'app-exp-table',
  templateUrl: './exp-table.component.html',
  styleUrls: ['./exp-table.component.css']
})
export class ExpTableComponent implements OnInit {

  expTable: any = (expData as any).default;

  constructor() { }

  ngOnInit(): void {
  }

}
