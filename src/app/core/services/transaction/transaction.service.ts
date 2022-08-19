import { Inject, Injectable } from '@angular/core';
import { Firestore, where } from '@angular/fire/firestore';
import { map } from 'rxjs';
import { Transaction } from '../../models/transaction';
import { FirestoreServiceBase } from '../common/firestore-service-base';

/**
 * Service for CRUD operations on transactions related to one expense report.
 */
@Injectable({
  providedIn: 'root',
})
export class TransactionService extends FirestoreServiceBase<Transaction> {
  constructor(
    fire: Firestore,
    @Inject('expenseReportId') expenseReportId: string,
    // @Inject('categoryId') categoryId: string,
  ) {
    super(
      fire,
      'expense-reports',
      expenseReportId,
      // 'categories',
      // categoryId,
      'transactions',
    );
  }

  GetMoneySpentForCategory(categoryId: string) {
    return this.getRealTime(
      where('categoryId', '==', categoryId),
    ).pipe(map((transactions) => {
      let moneySpent = 0;
      transactions.forEach((transaction) => {
        if (transaction.categoryId === categoryId) {
          moneySpent -= transaction.isIncome ? transaction.amount : -transaction.amount;
        }
      });
      return moneySpent;
    }));
  }
}
