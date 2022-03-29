import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  showToggle: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  changeTab(): void {
    console.log("coming soon...");
  }

  toggleNavbar(): void {
    this.showToggle = !this.showToggle;
  }

  closeNavbar(): void {
    this.showToggle = false;
  }

}
