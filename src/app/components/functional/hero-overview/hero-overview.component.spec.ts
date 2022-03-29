import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroOverviewComponent } from './hero-overview.component';

describe('HeroOverviewComponent', () => {
  let component: HeroOverviewComponent;
  let fixture: ComponentFixture<HeroOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeroOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
