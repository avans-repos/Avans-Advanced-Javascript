import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ExpenseReportService } from 'src/app/core/services/expense-report/expense-report.service';
import { Document } from '../../models/document';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent {
  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl(''),
  });

  isEdit: boolean = false;

  get name() {
    return this.form.controls['name'];
  }

  constructor(
    private dialogRef: MatDialogRef<CreateComponent>,
    @Inject(MAT_DIALOG_DATA) private data: Document,
    private expenseReportService: ExpenseReportService,
  ) {
    if (data && data.reference && data.expenseReport) {
      this.form.patchValue(data.expenseReport);
      this.isEdit = true;
    }
  }

  discard() {
    this.dialogRef.close();
  }

  async submit() {
    // Check if expense report is being edited
    if (this.isEdit && this.data) {
      const updatedDoc = {
        ...this.data.expenseReport,
        ...this.form.value,
      };

      this.expenseReportService.update(this.data.reference, updatedDoc);
    } else {
      this.expenseReportService.add(this.form.value);
    }
    this.dialogRef.close();
  }
}
