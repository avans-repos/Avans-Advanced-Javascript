import { Injectable } from '@angular/core';
import {
  addDoc, Firestore, CollectionReference, collection, onSnapshot, QuerySnapshot, Timestamp,
  DocumentReference, updateDoc, query, where,
} from '@angular/fire/firestore';
import { ExpenseReport } from '../../models/expense-report';
import { AuthService } from '../auth/auth.service';
import { SnackbarService } from '../snackbar/snackbar.service';

@Injectable({
  providedIn: 'root',
})
export class ExpenseReportService {
  private readonly collection: CollectionReference<ExpenseReport>;

  constructor(
    fire: Firestore,
    private snackbarService: SnackbarService,
    private authService: AuthService,
  ) {
    this.collection = collection(fire, 'expense-reports') as CollectionReference<ExpenseReport>;
  }

  getRealTime(callback: (snapshot: QuerySnapshot<ExpenseReport>) => void) {
    onSnapshot(
      query(
        this.collection,
        where('members', 'array-contains', this.authService.currentUser?.uid),
      ),
      callback,
    );
  }

  async add(expenseReport: ExpenseReport) {
    try {
      const filledExpenseReport = {
        ...expenseReport,
        createdAt: Timestamp.now(),
        createdBy: this.authService.currentUser?.uid,
      };

      const doc = await addDoc(this.collection, filledExpenseReport);
      this.snackbarService.open('Expense report created');
      return doc;
    } catch (error) {
      this.errorHandler(error);
    }

    return null;
  }

  async update(reference: DocumentReference<ExpenseReport>, expenseReport: ExpenseReport) {
    try {
      await updateDoc(reference, expenseReport);
      this.snackbarService.open('Expense report updated');
    } catch (error: any) {
      this.errorHandler(error);
    }
  }

  private errorHandler(error: any) {
    this.snackbarService.open(`Error: ${error.message}`);
  }
}
