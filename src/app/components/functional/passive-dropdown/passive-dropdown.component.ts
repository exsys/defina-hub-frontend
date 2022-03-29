import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { DataStorageService } from 'src/app/services/data-storage.service';

@Component({
  selector: 'app-passive-dropdown',
  templateUrl: './passive-dropdown.component.html',
  styleUrls: ['./passive-dropdown.component.css']
})
export class PassiveDropdownComponent implements OnInit {

  @Output() passiveUpdate = new EventEmitter<number>();

  @Input() passiveValues: any = []; // TODO: find out which type it should be
  @Input() selectedPassive: any; // selected passive
  @Input() heroNumber!: number;
  showToggle: boolean = false;

  dropdownList: any[] = [
    {level: "Level 1", index: 0},
    {level: "Level 2", index: 1},
    {level: "Level 3", index: 2}, 
    {level: "Level 4", index: 3},
    {level: "Level 5", index: 4},
    {level: "Level 6", index: 5}
  ];
  @Input() selectedLevel: any;

  constructor(
    readonly storage: DataStorageService,
  ) { }

  ngOnInit(): void {
    
  }

  toggleVisibility(): void {
    this.showToggle = !this.showToggle;
  }

  selectPassive(level: any): void {
    if(!this.storage.team[this.heroNumber]) {
      this.showToggle = false;
      return;
    }

    this.selectedLevel = level;
    this.showToggle = false;
    
    this.storage.changeStats(this.passiveValues[level.index], "passive", this.heroNumber);

    this.passiveUpdate.next();
  }

  close(): void {
    this.showToggle = false;
  }

}
