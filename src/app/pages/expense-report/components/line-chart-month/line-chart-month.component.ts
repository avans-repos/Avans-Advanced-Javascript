import { Component, Input } from '@angular/core';
import { Transaction } from '@angular/fire/firestore';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Required } from 'src/app/core/decorators/required-input';

@Component({
  selector: 'app-line-chart-month',
  templateUrl: './line-chart-month.component.html',
  styleUrls: ['./line-chart-month.component.scss'],
})
export class LineChartMonthComponent {
  selectedMonth: BehaviorSubject<Date> = new BehaviorSubject(new Date());

  totalBalance: Observable<number> = of(0);

  view: [number, number] = [700, 300];

  @Input() @Required public transactions!: Observable<Transaction[]>;

  public results = [
    {
      name: 'Germany',
      series: [
        {
          name: '2010',
          value: 7300000,
          min: 7000000,
          max: 7600000,
        },
        {
          name: '2011',
          value: 8940000,
          min: 8840000,
          max: 9300000,
        },
      ],
    },

    {
      name: 'USA',
      series: [
        {
          name: '2010',
          value: 7870000,
          min: 7800000,
          max: 7950000,
        },
        {
          name: '2011',
          value: 8270000,
          min: 8170000,
          max: 8300000,
        },
      ],
    },
  ];
}
