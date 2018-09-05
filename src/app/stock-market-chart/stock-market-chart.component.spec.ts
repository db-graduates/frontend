import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockMarketChartComponent } from './stock-market-chart.component';

describe('StockMarketChartComponent', () => {
  let component: StockMarketChartComponent;
  let fixture: ComponentFixture<StockMarketChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockMarketChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockMarketChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
