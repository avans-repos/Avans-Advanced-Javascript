import { Component, OnInit } from '@angular/core';
import { orderBy, where } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import {
  BehaviorSubject, switchMap, Observable,
} from 'rxjs';
import { ExpenseReport } from 'src/app/core/models/expense-report';
import { ExpenseReportService } from 'src/app/core/services/expense-report/expense-report.service';
import { CreateComponent } from './components/create/create.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [
    './dashboard.component.scss',
    './components/list-item/list-item.component.scss',
  ],
})
export class DashboardComponent implements OnInit {
  public expenseReports: Observable<ExpenseReport[]>;

  public isLoading = true;

  public viewArchived = new BehaviorSubject<boolean>(false);

  constructor(
    public dialog: MatDialog,
    expenseReportService: ExpenseReportService,
  ) {
    // Generate list of expense reports and sort by createdAt descending
    this.expenseReports = this.viewArchived.pipe(
      switchMap((viewArchived) => expenseReportService.getRealTime(
        where('isArchived', '==', viewArchived),
        orderBy('createdAt', 'desc'),
      )),
    );
  }

  ngOnInit() {
    this.expenseReports.subscribe(() => { this.isLoading = false; });
  }

  createExpenseReport() {
    this.dialog.open(CreateComponent, {
      width: '500px',
    });
  }

  toggleViewArchived() {
    this.isLoading = true;
    this.viewArchived.next(!this.viewArchived.getValue());
  }
}
