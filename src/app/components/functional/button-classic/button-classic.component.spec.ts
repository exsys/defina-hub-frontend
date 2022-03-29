import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonClassicComponent } from './button-classic.component';

describe('ButtonClassicComponent', () => {
  let component: ButtonClassicComponent;
  let fixture: ComponentFixture<ButtonClassicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonClassicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonClassicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
