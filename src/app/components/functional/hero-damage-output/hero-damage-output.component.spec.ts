import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroDamageOutputComponent } from './hero-damage-output.component';

describe('HeroDamageOutputComponent', () => {
  let component: HeroDamageOutputComponent;
  let fixture: ComponentFixture<HeroDamageOutputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeroDamageOutputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroDamageOutputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
