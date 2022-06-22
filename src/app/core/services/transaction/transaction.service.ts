import { Inject, Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { Transaction } from '../../models/transaction';
import { CathegoryService } from '../cathegory/cathegory.service';
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
    @Inject(CathegoryService) CathegoryService: string,
  ) {
    super(fire, 'expense-reports', expenseReportId, 'transactions');
  }
}
