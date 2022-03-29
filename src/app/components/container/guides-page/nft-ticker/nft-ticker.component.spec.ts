import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NftTickerComponent } from './nft-ticker.component';

describe('NftTickerComponent', () => {
  let component: NftTickerComponent;
  let fixture: ComponentFixture<NftTickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NftTickerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NftTickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
