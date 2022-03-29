import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamRecommendationsComponent } from './team-recommendations.component';

describe('TeamRecommendationsComponent', () => {
  let component: TeamRecommendationsComponent;
  let fixture: ComponentFixture<TeamRecommendationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamRecommendationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamRecommendationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
