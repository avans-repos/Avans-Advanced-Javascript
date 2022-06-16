import { Injectable } from '@angular/core';
import {
  Firestore, Timestamp,
  DocumentReference, QueryConstraint, where,
} from '@angular/fire/firestore';
import { ExpenseReport } from '../../models/expense-report';
import { AuthService } from '../auth/auth.service';
import { SnackbarService } from '../snackbar/snackbar.service';
import { FirestoreServiceBase } from '../common/firestore-service-base';

@Injectable({
  providedIn: 'root',
})
export class ExpenseReportService extends FirestoreServiceBase<ExpenseReport> {
  constructor(
    fire: Firestore,
    private snackbarService: SnackbarService,
    private authService: AuthService,
  ) {
    super(fire, 'expense-reports');
  }

  override getRealTime(...predicates: QueryConstraint[]) {
    return super.getRealTime(
      where('members', 'array-contains', this.authService.currentUser?.uid),
      ...predicates,
    );
  }

  override add(expenseReport: ExpenseReport) {
    const filledExpenseReport = {
      ...expenseReport,
      createdAt: Timestamp.now(),
      createdBy: this.authService.currentUser?.uid,
      isArchived: false,
    } as ExpenseReport;

    filledExpenseReport.members.push(this.authService.currentUser?.uid!);

    const returnValue = super.add(filledExpenseReport);
    returnValue.subscribe({
      complete: () => this.snackbarService.open('Expense report created'),
      error: (error) => this.errorHandler(error),
    });

    return returnValue;
  }

  override update(reference: DocumentReference<ExpenseReport>, expenseReport: ExpenseReport) {
    const returnValue = super.update(reference, expenseReport);
    returnValue.subscribe({
      complete: () => this.snackbarService.open('Expense report updated'),
      error: (error) => this.errorHandler(error),
    });
    return returnValue;
  }

  private errorHandler(error: any) {
    this.snackbarService.open(`Error: ${error.message}`);
  }
}
