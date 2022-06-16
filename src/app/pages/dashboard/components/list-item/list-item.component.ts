import { ExpenseReport } from 'src/app/core/models/expense-report';
import { ExpenseReportService } from 'src/app/core/services/expense-report/expense-report.service';
import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Required } from 'src/app/core/decorators/required-input';
import { CreateComponent } from '../create/create.component';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss'],
})
export class ListItemComponent {
  @Input() @Required expenseReport!: ExpenseReport;

  @Input() @Required dialog!: MatDialog;

  constructor(private expenseReportService: ExpenseReportService) { }

  editExpenseReport() {
    this.dialog.open(CreateComponent, {
      width: '500px',
      data: this.expenseReport,
    });
  }

  async archiveExpenseReport() {
    this.expenseReport.isArchived = !this.expenseReport.isArchived;

    const reference = await this.expenseReportService
      .createDocumentReference(this.expenseReport.id!);

    try {
      this.expenseReportService.update(reference, this.expenseReport);
    } catch (error) {
      this.expenseReport.isArchived = !this.expenseReport.isArchived;
    }
  }
}
