import { CategoryServiceFactory } from 'src/app/core/services/category/category-service.factory';
import { Timestamp, where } from '@angular/fire/firestore';
import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TransactionService } from 'src/app/core/services/transaction/transaction.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoryService } from 'src/app/core/services/category/category.service';
import { Observable, take } from 'rxjs';
import { Category } from 'src/app/core/models/catogory';

@Component({
  selector: 'app-create',
  templateUrl: './create-transaction.component.html',
  styleUrls: ['./create-transaction.component.scss'],
  providers: [CategoryServiceFactory],
})
export class CreateComponent {
  public categories: Observable<Category[]>;

  form = new FormGroup({
    amount: new FormControl(10, [Validators.required]),
    isIncome: new FormControl(false),
    date: new FormControl(Timestamp.now().toDate(), [Validators.required]),
  });

  constructor(
    private dialogRef: MatDialogRef<CreateComponent>,
    @Inject(MAT_DIALOG_DATA) private readonly data:{
      category: Observable<Category>,
      categoryService: CategoryService,
      transactionService: TransactionService,
    },
  ) {
    this.categories = this.data.categoryService.getRealTime(
      where('isArchived', '==', false),
    );
  }

  discard() {
    this.dialogRef.close();
  }

  submit() {
    this.data.category.pipe(take(1)).subscribe((category) => {
      this.data.transactionService.add({
        ...this.form.value,
        categoryId: category.id,
      });
      this.dialogRef.close();
    });
  }
}
