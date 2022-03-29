import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-guides-page',
  templateUrl: './guides-page.component.html',
  styleUrls: ['./guides-page.component.css']
})
export class GuidesPageComponent implements OnInit {

  selected: string = "overview";

  constructor(
    private router: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.selected = this.router.snapshot.firstChild?.routeConfig?.path || "overview";
  }

  changeView(view: string): void {
    this.selected = view;
  }

}
