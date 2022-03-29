import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainElementSelectorComponent } from './main-element-selector.component';

describe('MainElementSelectorComponent', () => {
  let component: MainElementSelectorComponent;
  let fixture: ComponentFixture<MainElementSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainElementSelectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainElementSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
