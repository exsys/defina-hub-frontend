import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ContactPageComponent } from './components/container/contact-page/contact-page.component';
import { ElementsTierListComponent } from './components/container/guides-page/elements-tier-list/elements-tier-list.component';
import { ExpTableComponent } from './components/container/guides-page/exp-table/exp-table.component';
import { GuidesOverviewComponent } from './components/container/guides-page/guides-overview/guides-overview.component';
import { GuidesPageComponent } from './components/container/guides-page/guides-page.component';
import { NftTickerComponent } from './components/container/guides-page/nft-ticker/nft-ticker.component';
import { TeamRecommendationsComponent } from './components/container/guides-page/team-recommendations/team-recommendations.component';
import { LandingPageComponent } from './components/container/landing-page/landing-page.component';

const routes: Routes = [
  { path: "", component: LandingPageComponent },
  { path: "contact", component: ContactPageComponent },
  { path: "guides", redirectTo: "guides/overview" },
  {
    path: "guides",
    component: GuidesPageComponent,
    children: [
      { path: "elements", component: ElementsTierListComponent },
      { path: "teams", component: TeamRecommendationsComponent },
      { path: "overview", component: GuidesOverviewComponent },
      { path: "exp", component: ExpTableComponent },
      { path: "ticker", component: NftTickerComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
