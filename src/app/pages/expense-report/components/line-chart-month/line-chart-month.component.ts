import { Component, Input, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Required } from 'src/app/core/decorators/required-input';
import { Transaction } from 'src/app/core/models/transaction';

@Component({
  selector: 'app-line-chart-month',
  templateUrl: './line-chart-month.component.html',
  styleUrls: ['./line-chart-month.component.scss'],
})
export class LineChartMonthComponent implements OnInit {
  totalBalance: Observable<number> = of(0);

  view: [number, number] = [700, 400];

  @Input() @Required public transactions: Observable<Transaction[]> = of([]);

  public results!: object[];

  ngOnInit() {
    this.transactions.subscribe((transactions) => {
      this.results = this.fillGraph(transactions);
    });
  }

  // eslint-disable-next-line class-methods-use-this
  private calculateMonth(dateValues: Map<number, number>) {
    const series: Object[] = [];
    let start = 0;
    // eslint-disable-next-line no-restricted-syntax
    for (const [date, value] of dateValues) {
      start += value;
      series.push({
        name: date,
        value: start,
      });
    }

    return series;
  }

  private fillGraph(transactions: Transaction[]): any {
    if (transactions.length === 0) return [];
    const dateValues = this.daysInMonth(transactions[0].date.toDate());

    transactions.forEach((transaction) => {
      const date = transaction.date.toDate().getDate();
      dateValues.set(date, (dateValues.get(date) ?? 0) + transaction.amount);
    });

    return [{
      name: 'Balance',
      series: this.calculateMonth(dateValues),
    }];
  }

  // eslint-disable-next-line class-methods-use-this
  private daysInMonth(date: Date) {
    const mapData = new Map<number, number>();

    const month = new Date(date.getFullYear(), date.getMonth(), 1);
    const nextMonth = new Date(month.getFullYear(), month.getMonth() + 1, 1);
    for (let d = month; d < nextMonth; d.setDate(d.getDate() + 1)) {
      mapData.set(d.getDate(), 0);
    }

    return mapData;
  }
}
