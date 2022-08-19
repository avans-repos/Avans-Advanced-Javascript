import { FactoryProvider } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { TransactionService } from './transaction.service';
/**
 * Exports a provider with a factory to create a TransactionService.
 */
const TransactionServiceFactory: FactoryProvider = {
  provide: TransactionService,
  useFactory: (route: ActivatedRoute, fire: Firestore) => {
    const reportId = route.snapshot.paramMap.get('expenseReportId');

    // const categoryId = route.snapshot.paramMap.get('categoryId')!;

    if (!reportId) {
      throw new Error('Missing expense report id');
    }
    // else if (!categoryId) {
    //   throw new Error('Missing category id');
    // }

    return new TransactionService(fire, reportId);
    // return new TransactionService(fire, reportId, categoryId);
  },
  deps: [ActivatedRoute, Firestore],
};

export {
  TransactionServiceFactory,
};
