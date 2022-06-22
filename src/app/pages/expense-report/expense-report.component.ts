import { Observable, switchMap, BehaviorSubject } from 'rxjs';
import { ExpenseReport } from 'src/app/core/models/expense-report';
import { Component, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  Firestore, where, Timestamp, orderBy,
} from '@angular/fire/firestore';
import { Transaction } from 'src/app/core/models/transaction';
import { MatDialog } from '@angular/material/dialog';
import { TransactionService } from '../../core/services/transaction/transaction.service';
import { ExpenseReportService } from '../../core/services/expense-report/expense-report.service';
import { CreateComponent } from './components/create/create.component';

@Component({
  selector: 'app-expense-report',
  templateUrl: './expense-report.component.html',
  styleUrls: ['./expense-report.component.scss'],
  providers: [
    TransactionService,
    {
      provide: TransactionService,
      useFactory: (route: ActivatedRoute, fire: Firestore) => {
        const reportId = route.snapshot.paramMap.get('expenseReportId')!;
        return new TransactionService(fire, reportId);
      },
      deps: [ActivatedRoute, Firestore],
    },
  ],
})
export class ExpenseReportComponent {
  public expenseReport: Observable<ExpenseReport>;

  public transactions: Observable<Transaction[]>;

  public selectedMonth: BehaviorSubject<Date> = new BehaviorSubject(new Date());

  constructor(
    route: ActivatedRoute,
    expenseReportService: ExpenseReportService,
    private dialog: MatDialog,
    @Inject(TransactionService) private transactionService: TransactionService,
  ) {
    this.expenseReport = route.paramMap.pipe(switchMap((params) => expenseReportService.get(params.get('expenseReportId')!)));
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
  }

  createTransaction() {
    this.dialog.open(CreateComponent, {
      width: '500px',
      data: this.transactionService,
    });
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
