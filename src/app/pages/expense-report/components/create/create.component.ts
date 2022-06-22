import { Timestamp } from '@angular/fire/firestore';
import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TransactionService } from 'src/app/core/services/transaction/transaction.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent {
  form = new FormGroup({
    amount: new FormControl(10, [Validators.required]),
    isIncome: new FormControl(false),
    date: new FormControl(Timestamp.now().toDate(), [Validators.required]),
    // type: new FormControl(null, [Validators.required]),
  });

  constructor(
    private dialogRef: MatDialogRef<CreateComponent>,
    @Inject(MAT_DIALOG_DATA) private readonly transactionService: TransactionService,
  ) { }

  discard() {
    this.dialogRef.close();
  }

  submit() {
    this.transactionService.add(this.form.value);
    this.dialogRef.close();
  }
}
