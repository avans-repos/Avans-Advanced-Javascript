import { FactoryProvider } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { SnackbarService } from '../snackbar/snackbar.service';
import { CategoryService } from './category.service';
// Exports a provider with a factory to create a TransactionService.

const CategoryServiceFactory: FactoryProvider = {
  provide: CategoryService,
  // eslint-disable-next-line max-len
  useFactory: (route: ActivatedRoute, fire: Firestore, snackbarService: SnackbarService) => {
    const reportId = route.snapshot.paramMap.get('expenseReportId');

    if (!reportId) {
      throw new Error('Missing expense report id');
    }

    return new CategoryService(fire, reportId, snackbarService);
  },
  deps: [ActivatedRoute, Firestore, SnackbarService],
};

export {
  CategoryServiceFactory,
};
