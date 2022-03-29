import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElementsTierListComponent } from './elements-tier-list.component';

describe('ElementsTierListComponent', () => {
  let component: ElementsTierListComponent;
  let fixture: ComponentFixture<ElementsTierListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ElementsTierListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ElementsTierListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
