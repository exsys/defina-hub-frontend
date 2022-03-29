import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroSelectionContainerComponent } from './hero-selection-container.component';

describe('HeroSelectionContainerComponent', () => {
  let component: HeroSelectionContainerComponent;
  let fixture: ComponentFixture<HeroSelectionContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeroSelectionContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroSelectionContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
