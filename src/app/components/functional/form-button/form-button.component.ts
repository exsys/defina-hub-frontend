import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-form-button',
  templateUrl: './form-button.component.html',
  styleUrls: ['./form-button.component.css']
})
export class FormButtonComponent implements OnInit {

  @Input() buttonText!: string;

  constructor() { }

  ngOnInit(): void {
  }
}
