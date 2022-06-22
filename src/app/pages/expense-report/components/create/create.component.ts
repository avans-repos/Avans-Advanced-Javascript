import { Timestamp, where } from '@angular/fire/firestore';
import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TransactionService } from 'src/app/core/services/transaction/transaction.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CathegoryService } from 'src/app/core/services/cathegory/cathegory.service';
import { Observable } from 'rxjs';
import { Cathegory } from 'src/app/core/models/cathory';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent {
  public cathegories: Observable<Cathegory[]>;

  form = new FormGroup({
    amount: new FormControl(10, [Validators.required]),
    isIncome: new FormControl(false),
    date: new FormControl(Timestamp.now().toDate(), [Validators.required]),
    cathegoryId: new FormControl(),
    // type: new FormControl(null, [Validators.required]),
  });

  constructor(
    private dialogRef: MatDialogRef<CreateComponent>,
    @Inject(MAT_DIALOG_DATA) private readonly transactionService: TransactionService,
    cathegoryService: CathegoryService,
  ) {
    this.cathegories = cathegoryService.getRealTime(
      where('isArchived', '==', false),
    );
  }

  discard() {
    this.dialogRef.close();
  }

  submit() {
    this.transactionService.add(this.form.value);
    this.dialogRef.close();
  }
}
