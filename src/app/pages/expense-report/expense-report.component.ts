import { map } from 'rxjs/operators';
import {
  Observable, switchMap, BehaviorSubject, of,
} from 'rxjs';
import { ExpenseReport } from 'src/app/core/models/expense-report';
import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  where, Timestamp, orderBy,
} from '@angular/fire/firestore';
import { Transaction } from 'src/app/core/models/transaction';
import { TransactionServiceFactory } from 'src/app/core/services/transaction/transaction-service.factory';
import { CategoryServiceFactory } from 'src/app/core/services/category/category-service.factory';
import { TransactionService } from '../../core/services/transaction/transaction.service';
import { ExpenseReportService } from '../../core/services/expense-report/expense-report.service';

@Component({
  selector: 'app-expense-report',
  templateUrl: './expense-report.component.html',
  styleUrls: ['./expense-report.component.scss'],
  providers: [TransactionServiceFactory, CategoryServiceFactory],
})
export class ExpenseReportComponent implements OnInit {
  public expenseReport: Observable<ExpenseReport>;

  public transactions: Observable<Transaction[]> = of([]);

  selectedMonth: BehaviorSubject<Date> = new BehaviorSubject(new Date());

  totalBalance: Observable<number> = of(0);

  constructor(
    route: ActivatedRoute,
    private expenseReportService: ExpenseReportService,

    @Inject(TransactionService) private transactionService: TransactionService,
  ) {
    this.expenseReport = route.paramMap.pipe(switchMap((params) => this.expenseReportService.get(params.get('expenseReportId')!)));
  }

  ngOnInit() {
    this.transactions = this.selectedMonth.pipe(
      switchMap((month) => {
        const start = Timestamp.fromDate(new Date(month.getFullYear(), month.getMonth(), 1));
        const end = Timestamp.fromDate(new Date(month.getFullYear(), month.getMonth() + 1, 0));
        return this.transactionService.getRealTime(
          where('date', '>=', start),
          where('date', '<=', end),
          orderBy('date', 'desc'),
        );
      }),
    );

    this.totalBalance = this.transactions.pipe(map(
      (transactions) => transactions.reduce(
        // eslint-disable-next-line max-len
        (acc, transaction) => acc + (transaction.isIncome ? transaction.amount : -transaction.amount),
        0,
      ),
    ));
  }

  deleteTransaction(transaction: Transaction) {
    this.transactionService.getDoc(transaction.id!)
      .subscribe((doc) => this.transactionService.delete(doc));
  }

  next() {
    this.selectedMonth.next(new Date(
      this.selectedMonth.value.getFullYear(),
      this.selectedMonth.value.getMonth() + 1,
    ));
  }

  prev() {
    this.selectedMonth.next(new Date(
      this.selectedMonth.value.getFullYear(),
      this.selectedMonth.value.getMonth() - 1,
    ));
  }

  reset() {
    this.selectedMonth.next(new Date());
  }
}
