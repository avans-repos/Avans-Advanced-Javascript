import { Provider } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { SnackbarService } from '../snackbar/snackbar.service';
import { CategoryService } from './category.service';
// Exports a provider with a factory to create a TransactionService.

const CategoryServiceFactory: Provider[] = [
  CategoryService,
  {
    provide: CategoryService,
    useFactory: (route: ActivatedRoute, fire: Firestore, snackbarService: SnackbarService) => {
      const reportId = route.snapshot.paramMap.get('expenseReportId')!;
      return new CategoryService(fire, reportId, snackbarService);
    },
    deps: [ActivatedRoute, Firestore, SnackbarService],
  },
];

export {
  CategoryServiceFactory,
};
