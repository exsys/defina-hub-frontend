import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescriptionContainerComponent } from './description-container.component';

describe('DescriptionContainerComponent', () => {
  let component: DescriptionContainerComponent;
  let fixture: ComponentFixture<DescriptionContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DescriptionContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DescriptionContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
