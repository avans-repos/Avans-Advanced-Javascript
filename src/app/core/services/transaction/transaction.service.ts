import { Category } from 'src/app/core/models/cathory';
import { Inject, Injectable } from '@angular/core';
import { doc, DocumentReference, Firestore } from '@angular/fire/firestore';
import {
  defer, Observable, switchMap,
} from 'rxjs';
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
    private fire: Firestore,
    @Inject('expenseReportId') expenseReportId: string,
  ) {
    super(fire, 'expense-reports', expenseReportId, 'transactions');
  }

  override add(transaction: Transaction): Observable<DocumentReference<Transaction>> {
    const $category = defer(async () => doc(this.fire, `cathegories/${transaction.categoryId}`) as DocumentReference<Category>);

    const returnValue = $category.pipe(
      switchMap((categoryRef) => {
        // eslint-disable-next-line no-param-reassign
        transaction.category = categoryRef;
        return super.add(transaction);
      }),
    );

    // This is a bit hacky but the "share" operator is not working as expected.
    returnValue.subscribe();
    return returnValue;
  }
}
