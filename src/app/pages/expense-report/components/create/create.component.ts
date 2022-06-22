import { Timestamp } from '@angular/fire/firestore';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TransactionService } from 'src/app/core/services/transaction/transaction.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent {
  form = new FormGroup({
    amount: new FormControl(10, [Validators.required]),
    isIncome: new FormControl(true),
    date: new FormControl(Timestamp.now().toDate(), [Validators.required]),
    // type: new FormControl(null, [Validators.required]),
  });

  constructor(
    private dialogRef: MatDialogRef<CreateComponent>,
    private transactionService: TransactionService,
  ) { }

  discard() {
    this.dialogRef.close();
  }

  async submit() {
    return Promise.resolve();
  }
}
