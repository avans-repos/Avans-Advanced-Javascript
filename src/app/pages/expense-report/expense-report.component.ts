import { Observable, switchMap } from 'rxjs';
import { ExpenseReport } from 'src/app/core/models/expense-report';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExpenseReportService } from '../../core/services/expense-report/expense-report.service';

@Component({
  selector: 'app-expense-report',
  templateUrl: './expense-report.component.html',
  styleUrls: ['./expense-report.component.scss'],
})
export class ExpenseReportComponent {
  public expenseReport: Observable<ExpenseReport>;

  constructor(route: ActivatedRoute, expenseReportService: ExpenseReportService) {
    this.expenseReport = route.paramMap.pipe(
      switchMap((params) => expenseReportService.get(params.get('expenseReportId')!)),
    );
  }
}
