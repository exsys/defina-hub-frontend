import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuidesOverviewComponent } from './guides-overview.component';

describe('GuidesOverviewComponent', () => {
  let component: GuidesOverviewComponent;
  let fixture: ComponentFixture<GuidesOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuidesOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GuidesOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
