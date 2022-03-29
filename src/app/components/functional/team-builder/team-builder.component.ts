import { Component, OnInit, OnDestroy, ViewChildren, QueryList } from '@angular/core';

import { DataStorageService } from 'src/app/services/data-storage.service';
import { FileUploadService } from 'src/app/services/file-upload.service';

import { HeroSelectionContainerComponent } from '../hero-selection-container/hero-selection-container.component';

@Component({
  selector: 'app-team-builder',
  templateUrl: './team-builder.component.html',
  styleUrls: ['./team-builder.component.css']
})
export class TeamBuilderComponent implements OnInit, OnDestroy {

  tabList: string[] = ["Stats", "Overview", "Damage"];
  selected: string = "Stats";

  @ViewChildren(HeroSelectionContainerComponent) selectContainer?: QueryList<HeroSelectionContainerComponent>;

  constructor(
    private storage: DataStorageService,
    private uploader: FileUploadService,
  ) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.storage.clearTeam();
  }

  // if wind main element is selected then all heroes will be checked for speed again
  recheckRequirement(): void {
    this.selectContainer?.toArray().forEach(container => {
      container.recheckSpeedRequirement();
    });
  }

  changeTab(tab: string): void {
    this.selected = tab;
  }

  saveTeam(): void {
    this.storage.saveTeamAsJson();
  }

  loadTeam(event: any): void {
    this.uploader.loadTeam(event);
  }

}
