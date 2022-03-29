import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './components/container/landing-page/landing-page.component';
import { HeaderComponent } from './components/functional/header/header.component';
import { TeamBuilderComponent } from './components/functional/team-builder/team-builder.component';
import { HeroSelectionContainerComponent } from './components/functional/hero-selection-container/hero-selection-container.component';
import { MainElementSelectorComponent } from './components/functional/main-element-selector/main-element-selector.component';
import { SkillElementSelectorComponent } from './components/functional/skill-element-selector/skill-element-selector.component';
import { TeamOverviewComponent } from './components/functional/team-overview/team-overview.component';
import { DescriptionContainerComponent } from './components/functional/description-container/description-container.component';
import { HeroDamageOutputComponent } from './components/functional/hero-damage-output/hero-damage-output.component';
import { HeroOverviewComponent } from './components/functional/hero-overview/hero-overview.component';
import { PassiveDropdownComponent } from './components/functional/passive-dropdown/passive-dropdown.component';
import { ClickOutsideDirective } from './directives/click-outside.directive';
import { HeroDropdownComponent } from './components/functional/hero-dropdown/hero-dropdown.component';
import { TooltipComponent } from './components/functional/tooltip/tooltip.component';
import { FooterComponent } from './components/functional/footer/footer.component';
import { ContactFormComponent } from './components/functional/contact-form/contact-form.component';
import { ContactPageComponent } from './components/container/contact-page/contact-page.component';
import { SkillDropdownComponent } from './components/functional/skill-dropdown/skill-dropdown.component';
import { HeroDamageDisplayComponent } from './components/functional/hero-damage-output/hero-damage-display/hero-damage-display.component';
import { ButtonClassicComponent } from './components/functional/button-classic/button-classic.component';
import { GuidesPageComponent } from './components/container/guides-page/guides-page.component';
import { ElementsTierListComponent } from './components/container/guides-page/elements-tier-list/elements-tier-list.component';
import { TeamRecommendationsComponent } from './components/container/guides-page/team-recommendations/team-recommendations.component';
import { ElementTierListComponent } from './components/functional/element-tier-list/element-tier-list.component';
import { GuidesOverviewComponent } from './components/container/guides-page/guides-overview/guides-overview.component';
import { TeamRecommendationComponent } from './components/functional/team-recommendation/team-recommendation.component';
import { ExpTableComponent } from './components/container/guides-page/exp-table/exp-table.component';
import { NftTickerComponent } from './components/container/guides-page/nft-ticker/nft-ticker.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    HeaderComponent,
    TeamBuilderComponent,
    HeroSelectionContainerComponent,
    MainElementSelectorComponent,
    SkillElementSelectorComponent,
    TeamOverviewComponent,
    DescriptionContainerComponent,
    HeroDamageOutputComponent,
    HeroOverviewComponent,
    PassiveDropdownComponent,
    ClickOutsideDirective,
    HeroDropdownComponent,
    TooltipComponent,
    FooterComponent,
    ContactFormComponent,
    ContactPageComponent,
    SkillDropdownComponent,
    HeroDamageDisplayComponent,
    ButtonClassicComponent,
    GuidesPageComponent,
    ElementsTierListComponent,
    TeamRecommendationsComponent,
    ElementTierListComponent,
    GuidesOverviewComponent,
    TeamRecommendationComponent,
    ExpTableComponent,
    NftTickerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
