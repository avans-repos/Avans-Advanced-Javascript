import { of, pipe, share } from 'rxjs';
import { EmailSearcherService } from 'src/app/core/services/email-searcher/email-searcher.service';
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
    members: new FormControl([]),
  });

  isEdit: boolean = false;

  get name() {
    return this.form.controls['name'];
  }

  get owner() {
    // Returns observable of owner's email if it exists
    return this.emailSearcherService.getEmailFromUid(this.form.value.createdBy);
  }

  constructor(
    private dialogRef: MatDialogRef<CreateComponent>,
    @Inject(MAT_DIALOG_DATA) public readonly data: Document,
    private expenseReportService: ExpenseReportService,
    private emailSearcherService: EmailSearcherService,
  ) {
    // If data is passed in, this is an edit
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
      // Inject original report and override with form data
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

  membersUpdate(newMembers: string[]) {
    this.form.controls['members'].setValue(newMembers);
  }
}
