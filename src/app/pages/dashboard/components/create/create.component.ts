import { Component, Inject } from '@angular/core';
import { DocumentReference } from '@angular/fire/firestore';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { take } from 'rxjs';
import { ExpenseReport } from 'src/app/core/models/expense-report';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { ExpenseReportService } from 'src/app/core/services/expense-report/expense-report.service';

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
    @Inject(MAT_DIALOG_DATA)
    private data: {
      expenseReport: ExpenseReport;
      documentReference: DocumentReference<ExpenseReport>;
    } | null,
    private expenseReportService: ExpenseReportService,
    private authService: AuthService,
  ) {
    if (data) {
      this.form.patchValue(data.expenseReport);
      this.isEdit = true;
    }
  }

  discard() {
    this.dialogRef.close();
  }

  async submit() {
    this.authService.authState.pipe(take(1)).subscribe((user) => {
      // Check if user is authenticated
      if (user === null) { return; }

      const expenseReport: ExpenseReport = {
        ...this.form.value,
        createdBy: user.uid,
      };

      // Check if expense report is being edited
      if (this.isEdit && this.data) {
        this.expenseReportService.update(this.data.documentReference, expenseReport);
      } else {
        this.expenseReportService.add(this.form.value);
      }
      this.dialogRef.close();
    });
  }
}
