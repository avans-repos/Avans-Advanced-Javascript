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
    const reportId = route.snapshot.paramMap.get('expenseReportId')!;
    return new TransactionService(fire, reportId);
  },
  deps: [ActivatedRoute, Firestore],
};

export {
  TransactionServiceFactory,
};
