import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillDropdownComponent } from './skill-dropdown.component';

describe('SkillDropdownComponent', () => {
  let component: SkillDropdownComponent;
  let fixture: ComponentFixture<SkillDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkillDropdownComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
