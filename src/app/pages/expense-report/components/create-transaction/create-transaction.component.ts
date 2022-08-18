import { CategoryServiceFactory } from 'src/app/core/services/category/category-service.factory';
import { Timestamp } from '@angular/fire/firestore';
import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TransactionService } from 'src/app/core/services/transaction/transaction.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable, take } from 'rxjs';
import { Category } from 'src/app/core/models/catogory';

@Component({
  selector: 'app-create',
  templateUrl: './create-transaction.component.html',
  styleUrls: ['./create-transaction.component.scss'],
  providers: [CategoryServiceFactory],
})
export class CreateComponent {
  form = new FormGroup({
    amount: new FormControl(10, [Validators.required]),
    isIncome: new FormControl(false),
    date: new FormControl(Timestamp.now().toDate(), [Validators.required]),
  });

  constructor(
    private dialogRef: MatDialogRef<CreateComponent>,
    @Inject(MAT_DIALOG_DATA) private readonly data:{
      category: Observable<Category>,
      transactionService: TransactionService,
    },
  ) {
  }

  discard() {
    this.dialogRef.close();
  }

  submit() {
    if (this.data.category) {
      this.data.category.pipe(take(1)).subscribe((category) => {
        this.data.transactionService.add({
          ...this.form.value,
          categoryId: category.id,
        });
        this.dialogRef.close();
      });
    } else {
      this.data.transactionService.add(this.form.value);
      this.dialogRef.close();
    }
  }
}
