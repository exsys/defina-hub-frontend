import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamRecommendationComponent } from './team-recommendation.component';

describe('TeamRecommendationComponent', () => {
  let component: TeamRecommendationComponent;
  let fixture: ComponentFixture<TeamRecommendationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamRecommendationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamRecommendationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
