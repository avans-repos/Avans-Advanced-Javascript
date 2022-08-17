import { TransactionServiceFactory } from 'src/app/core/services/transaction/transaction-service.factory';
import { Component, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { Category } from 'src/app/core/models/catogory';
import { CategoryServiceFactory } from 'src/app/core/services/category/category-service.factory';
import { CategoryService } from 'src/app/core/services/category/category.service';
import { TransactionService } from 'src/app/core/services/transaction/transaction.service';
import { CreateComponent } from '../../../components/create-transaction/create-transaction.component';

@Component({
  selector: 'app-category-show',
  templateUrl: './category-show.component.html',
  styleUrls: ['./category-show.component.scss'],
  providers: [CategoryServiceFactory, TransactionServiceFactory],
})
export class CategoryShowComponent {
  constructor(
    route: ActivatedRoute,
    private dialog: MatDialog,
    @Inject(CategoryService) private categoryService: CategoryService,
    @Inject(TransactionService) private transactionService: TransactionService,
  ) {
    this.expenseReportId = route.snapshot.paramMap.get('expenseReportId')!;
    // weet niet hoe dit werkt
    this.category = route.paramMap.pipe(switchMap((params) => this.categoryService.get(params.get('categoryId')!)));
    // this.category = categoryService.get(route.snapshot.paramMap.get('categoryId')!);
    console.log(this.expenseReportId);
    console.log(this.category);
  }

  public expenseReportId: String;

  public category: Observable<Category>;

  createTransaction() {
    this.dialog.open(CreateComponent, {
      width: '500px',
      data: {
        categoryService: this.categoryService,
        transactionService: this.transactionService,
        category: this.category,
      },
    });
  }
}
