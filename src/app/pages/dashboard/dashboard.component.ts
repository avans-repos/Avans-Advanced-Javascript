import { Component, OnInit } from '@angular/core';
import { where } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import { ExpenseReport } from 'src/app/core/models/expense-report';
import { ExpenseReportService } from 'src/app/core/services/expense-report/expense-report.service';
import { CreateComponent } from './components/create/create.component';
import { Document } from './models/document';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [
    './dashboard.component.scss',
    './components/list-item/list-item.component.scss',
  ],
})
export class DashboardComponent implements OnInit {
  public documents: Document[] = [];

  public isLoading = true;

  public viewArchived = new BehaviorSubject<boolean>(false);

  constructor(
    public dialog: MatDialog,
    private expenseReportService: ExpenseReportService,
  ) { }

  ngOnInit(): void {
    // Generate list of expense reports
    this.viewArchived.subscribe((viewArchived) => {
      this.expenseReportService.getRealTime(
        (snapshot) => {
        // Get expense reports and sort by date descending
          this.documents = snapshot.docs
            .sort((a, b) => a.data().createdAt.nanoseconds - b.data().createdAt.nanoseconds)
            .map((doc) => ({
              reference: doc.ref,
              expenseReport: doc.data() as ExpenseReport,
            }));

          this.isLoading = false;
        },
        [
          where('isArchived', '==', viewArchived),
        ],
      );
    });
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
