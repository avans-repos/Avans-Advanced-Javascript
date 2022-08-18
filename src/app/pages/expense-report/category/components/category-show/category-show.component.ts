import { TransactionServiceFactory } from 'src/app/core/services/transaction/transaction-service.factory';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import {
  BehaviorSubject, Observable, of, switchMap,
} from 'rxjs';
import { Category } from 'src/app/core/models/catogory';
import { CategoryServiceFactory } from 'src/app/core/services/category/category-service.factory';
import { CategoryService } from 'src/app/core/services/category/category.service';
import { TransactionService } from 'src/app/core/services/transaction/transaction.service';
import {
  orderBy, Timestamp, where,
} from '@angular/fire/firestore';
import { Transaction } from 'src/app/core/models/transaction';
import { CreateComponent } from '../../../components/create-transaction/create-transaction.component';

@Component({
  selector: 'app-category-show',
  templateUrl: './category-show.component.html',
  styleUrls: ['./category-show.component.scss'],
  providers: [CategoryServiceFactory, TransactionServiceFactory],
})
export class CategoryShowComponent implements OnInit {
  constructor(
    route: ActivatedRoute,
    private dialog: MatDialog,
    @Inject(CategoryService) private categoryService: CategoryService,
    @Inject(TransactionService) private transactionService: TransactionService,
  ) {
    this.expenseReportId = route.snapshot.paramMap.get('expenseReportId')!;
    this.category = route.paramMap.pipe(switchMap((params) => this.categoryService.get(params.get('categoryId')!)));
    this.categoryId = route.snapshot.paramMap.get('categoryId')!;
  }

  ngOnInit(): void {
    this.transactions = this.selectedMonth.pipe(
      switchMap((month) => {
        const start = Timestamp.fromDate(new Date(month.getFullYear(), month.getMonth(), 1));
        const end = Timestamp.fromDate(new Date(month.getFullYear(), month.getMonth() + 1, 0));
        return this.transactionService.getRealTime(
          where('date', '>=', start),
          where('date', '<=', end),
          where('categoryId', '==', this.categoryId),
          orderBy('date', 'desc'),
        );
      }),
    );
  }

  public transactions: Observable<Transaction[]> = of([]);

  selectedMonth: BehaviorSubject<Date> = new BehaviorSubject(new Date());

  public expenseReportId: String;

  public category: Observable<Category>;

  public categoryId: String;

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

  deleteTransaction(transaction: Transaction) {
    this.transactionService.getDoc(transaction.id!)
      .subscribe((doc) => this.transactionService.delete(doc));
  }
}
