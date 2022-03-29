import { Component, Input, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';

import { MainElement } from 'src/app/shared/main-element';
import { DataStorageService } from 'src/app/services/data-storage.service';
import { FileUploadService } from 'src/app/services/file-upload.service';
import * as elementData from "../../../shared/elements.json";

@Component({
  selector: 'app-main-element-selector',
  templateUrl: './main-element-selector.component.html',
  styleUrls: ['./main-element-selector.component.css']
})
export class MainElementSelectorComponent implements OnInit, OnDestroy {

  // subscription for team upload
  private teamFileSubscription?: Subscription;

  @Input() heroNumber!: number;
  elementList: MainElement[] = (elementData as any).default.main;
  showToggle: boolean = false;
  currentElement: string = "none";

  // for speed requirement checking when wind main element is selected
  @Output() mainElementUpdate = new EventEmitter<void>();

  constructor(
    private storage: DataStorageService,
    private uploader: FileUploadService,
  ) { }

  ngOnInit(): void {
    this.teamFileSubscription = this.uploader.teamFileSubject$.subscribe(team => {
      if(team !== null) {
        // iterate through uploaded team
        for (let i = 0; i < team.length; i++) {
          // if same index change main element
          if(team[i].index === this.heroNumber) {
            if(team[i].mainElement) {
              // get correct element from list and select as current element
              for(let element of this.elementList) {
                if (element.name === team[i].mainElement) {
                  this.selectElement(element);
                }
              }
            }
          }
        }
      }
    });
  }

  ngOnDestroy(): void {
      this.teamFileSubscription?.unsubscribe();
  }

  toggleVisibility(): void {
    this.showToggle = !this.showToggle;
  }

  selectElement(element: MainElement): void {
    this.currentElement = element.element.toLowerCase();
    this.showToggle = false;

    this.storage.changeElement(element, "main", this.heroNumber);
    this.storage.calcDamageOutputAll();

    this.mainElementUpdate.next(); // for speed requirement checking
  }

  changeDescription(): void {
    this.elementList.forEach(elem => {
      if(elem.name.toLowerCase() === this.currentElement + " totem") {
        let description = `2 Heroes: ${elem.bonusOne} \n 4 Heroes: ${elem.bonusTwo}`;
        this.storage.changeDescription(elem, description, this.heroNumber, "none");
      }
    });
  }

  getImageName(element: string): string {
    return element.split(" ").join("-").toLowerCase();
  }

  close(): void {
    this.showToggle = false;
  }

}
