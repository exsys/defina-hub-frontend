import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroDamageDisplayComponent } from './hero-damage-display.component';

describe('HeroDamageDisplayComponent', () => {
  let component: HeroDamageDisplayComponent;
  let fixture: ComponentFixture<HeroDamageDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeroDamageDisplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroDamageDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
