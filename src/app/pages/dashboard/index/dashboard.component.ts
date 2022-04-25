import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ExpenseReport } from 'src/app/core/models/expense-report';
import { ExpenseReportService } from 'src/app/core/services/expense-report/expense-report.service';
import { CreateComponent } from '../components/create/create.component';
import { Document } from '../models/document';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  public documents: Document[] = [];

  constructor(
    public dialog: MatDialog,
    private expenseReportService: ExpenseReportService,
  ) { }

  ngOnInit(): void {
    // Generate list of expense reports
    this.expenseReportService.getRealTime((snapshot) => {
      // Get expense reports and sort by date descending
      this.documents = snapshot.docs
        .sort((a, b) => a.data().createdAt.nanoseconds - b.data().createdAt.nanoseconds)
        .map((doc) => ({
          reference: doc.ref,
          expenseReport: doc.data() as ExpenseReport,
        }));
    });
  }

  createExpenseReport() {
    this.dialog.open(CreateComponent, {
      width: '500px',
    });
  }

  editExpenseReport(document: Document) {
    this.dialog.open(CreateComponent, {
      width: '500px',
      data: {
        expenseReport: document.expenseReport,
        reference: document.reference,
      },
    });
  }
}
