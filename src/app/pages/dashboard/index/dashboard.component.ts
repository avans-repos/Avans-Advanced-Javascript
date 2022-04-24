import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ExpenseReport } from 'src/app/core/models/expense-report';
import { ExpenseReportService } from 'src/app/core/services/expense-report/expense-report.service';
import { CreateComponent } from '../create/create.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public expenseReports: ExpenseReport[] = [];

  constructor(
    public dialog: MatDialog,
    private expenseReportService: ExpenseReportService,
  ) { }

  ngOnInit(): void {
    // Generate list of expense reports
    this.expenseReportService.getRealTime((snapshot) => {
      // Get expense reports and sort by date descending
      this.expenseReports = snapshot.docs.map(doc => doc.data()).sort((a, b) => {
        return a.createdAt.nanoseconds - b.createdAt.nanoseconds;
      });
    });
  }

  createExpenseReport() {
    this.dialog.open(CreateComponent, {
      width: '500px',
    });
  }
}
