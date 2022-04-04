import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button-classic',
  templateUrl: './button-classic.component.html',
  styleUrls: ['./button-classic.component.css']
})
export class ButtonClassicComponent implements OnInit {

  @Input() buttonText!: string;
  @Output() buttonClick = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  onClick(): void {
    this.buttonClick.next();
  }

}
