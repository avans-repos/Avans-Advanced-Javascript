import { Injectable } from '@angular/core';
import { DocumentReference, Firestore } from '@angular/fire/firestore';
import { ExpenseReport } from '../../models/expense-report';
import { Transaction } from '../../models/transaction';
import { FirestoreServiceBase } from '../common/firestore-service-base';

/**
 * Service for CRUD operations on transactions related to one expense report.
 */
@Injectable()
export class TransactionService extends FirestoreServiceBase<Transaction> {
  constructor(
    fire: Firestore,
    expenseReport: DocumentReference<ExpenseReport>,
  ) {
    super(fire, expenseReport.id, 'transactions');
  }
}
