import { Inject, Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
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
}
