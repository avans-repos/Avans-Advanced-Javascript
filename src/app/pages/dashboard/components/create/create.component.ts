import { ExpenseReport } from 'src/app/core/models/expense-report';
import { Observable, of } from 'rxjs';
import { EmailSearcherService } from 'src/app/core/services/email-searcher/email-searcher.service';
import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
    members: new FormControl([]),
  });

  isEdit: boolean = false;

  get name() {
    return this.form.controls['name'];
  }

  readonly owner: Observable<string> = of('');

  constructor(
    private dialogRef: MatDialogRef<CreateComponent>,
    @Inject(MAT_DIALOG_DATA) public readonly data: ExpenseReport,
    private expenseReportService: ExpenseReportService,
    private emailSearcherService: EmailSearcherService,
  ) {
    // If data is passed in, this is an edit
    if (data) {
      this.form.patchValue(data);
      this.isEdit = true;
      this.owner = this.emailSearcherService.getEmailFromUid(this.data.createdBy);
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
        ...this.data,
        ...this.form.value,
      };

      const ref = await this.expenseReportService.createDocumentReference(this.data.id);

      this.expenseReportService.update(ref, updatedDoc);
    } else {
      this.expenseReportService.add(this.form.value);
    }
    this.dialogRef.close();
  }

  membersUpdate(newMembers: string[]) {
    this.form.controls['members'].setValue(newMembers);
  }
}
