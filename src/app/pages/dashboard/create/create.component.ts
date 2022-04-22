import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ExpenseReportService } from 'src/app/core/services/expense-report/expense-report.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent {

  form = new FormGroup({
    name: new FormControl('', [
      Validators.required,
    ]),
    description: new FormControl(''),
  });

  get name() {
    return this.form.controls['name'];
  }

  constructor(
    private dialogRef: MatDialogRef<CreateComponent>,
    private expenseReportService: ExpenseReportService,
  ) { }

  discard() {
    this.dialogRef.close();
  }

  async submit() {
    await this.expenseReportService.add(this.form.value);
    this.dialogRef.close();
  }
}
