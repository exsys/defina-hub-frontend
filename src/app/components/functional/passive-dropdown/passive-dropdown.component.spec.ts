import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassiveDropdownComponent } from './passive-dropdown.component';

describe('PassiveDropdownComponent', () => {
  let component: PassiveDropdownComponent;
  let fixture: ComponentFixture<PassiveDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PassiveDropdownComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PassiveDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
