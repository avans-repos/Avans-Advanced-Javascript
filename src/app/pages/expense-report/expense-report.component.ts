import { Observable, switchMap } from 'rxjs';
import { ExpenseReport } from 'src/app/core/models/expense-report';
import { Component, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Firestore } from '@angular/fire/firestore';
import { Transaction } from 'src/app/core/models/transaction';
import { MatDialog } from '@angular/material/dialog';
import { ExpenseReportService } from '../../core/services/expense-report/expense-report.service';
import { TransactionService } from '../../core/services/transaction/transaction.service';
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

  constructor(
    route: ActivatedRoute,
    private expenseReportService: ExpenseReportService,
    private dialog: MatDialog,
    @Inject(TransactionService) transactionService: TransactionService,
  ) {
    this.expenseReport = route.paramMap.pipe(switchMap((params) => expenseReportService.get(params.get('expenseReportId')!)));
    this.transactions = transactionService.getRealTime();
  }

  createTransaction() {
    this.dialog.open(CreateComponent, {
      width: '500px',
      data: this.expenseReportService,
    });
  }
}
