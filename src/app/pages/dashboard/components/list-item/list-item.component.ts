import { ExpenseReportService } from 'src/app/core/services/expense-report/expense-report.service';
import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Required } from 'src/app/core/decorators/required-input';
import { Document } from '../../models/document';
import { CreateComponent } from '../create/create.component';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss'],
})
export class ListItemComponent {
  @Input() @Required document!: Document;

  @Input() @Required dialog!: MatDialog;

  constructor(private expenseReportService: ExpenseReportService) { }

  editExpenseReport() {
    this.dialog.open(CreateComponent, {
      width: '500px',
      data: {
        expenseReport: this.document.expenseReport,
        reference: this.document.reference,
      },
    });
  }

  archiveExpenseReport() {
    this.document.expenseReport.isArchived = true;

    this.expenseReportService.update(this.document.reference, this.document.expenseReport);
  }
}
