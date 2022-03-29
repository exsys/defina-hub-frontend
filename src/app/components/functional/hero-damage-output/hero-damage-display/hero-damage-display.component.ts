import { Component, Input, OnInit } from '@angular/core';

import { DataStorageService } from 'src/app/services/data-storage.service';

@Component({
  selector: 'app-hero-damage-display',
  templateUrl: './hero-damage-display.component.html',
  styleUrls: ['./hero-damage-display.component.css']
})
export class HeroDamageDisplayComponent implements OnInit {

  @Input() heroNumber!: number;

  constructor(
    readonly storage: DataStorageService,
  ) { }

  ngOnInit(): void {
  }

}
