import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElementTierListComponent } from './element-tier-list.component';

describe('ElementTierListComponent', () => {
  let component: ElementTierListComponent;
  let fixture: ComponentFixture<ElementTierListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ElementTierListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ElementTierListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
