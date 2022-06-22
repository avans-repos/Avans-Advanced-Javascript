import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LineChartMonthComponent } from './line-chart-month.component';

describe('LineChartMonthComponent', () => {
  let component: LineChartMonthComponent;
  let fixture: ComponentFixture<LineChartMonthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LineChartMonthComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LineChartMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
