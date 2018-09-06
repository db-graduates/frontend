import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiffStockValuesChartComponent } from './diff-stock-values-chart.component';

describe('DiffStockValuesChartComponent', () => {
  let component: DiffStockValuesChartComponent;
  let fixture: ComponentFixture<DiffStockValuesChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiffStockValuesChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiffStockValuesChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
