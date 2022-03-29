import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillElementSelectorComponent } from './skill-element-selector.component';

describe('SkillElementSelectorComponent', () => {
  let component: SkillElementSelectorComponent;
  let fixture: ComponentFixture<SkillElementSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkillElementSelectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillElementSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
