import { Injectable } from '@angular/core';
import {
  addDoc, Firestore, CollectionReference, collection, onSnapshot, QuerySnapshot, Timestamp,
  DocumentReference, updateDoc,
} from '@angular/fire/firestore';
import { ExpenseReport } from '../../models/expense-report';
import { AuthService } from '../auth/auth.service';
import { SnackbarService } from '../snackbar/snackbar.service';

@Injectable({
  providedIn: 'root',
})
export class ExpenseReportService {
  public readonly collection: CollectionReference<ExpenseReport>;

  constructor(
    fire: Firestore,
    private snackbarService: SnackbarService,
    private authService: AuthService,
  ) {
    this.collection = collection(fire, 'expense-reports') as CollectionReference<ExpenseReport>;
  }

  async add(expenseReport: ExpenseReport) {
    const filledExpenseReport = {
      ...expenseReport,
      createdAt: Timestamp.now(),
      createdBy: this.authService.currentUser?.uid,
    };

    const doc = await addDoc(this.collection, filledExpenseReport);
    this.snackbarService.open('Expense report created');
    return doc;
  }

  async update(reference: DocumentReference<ExpenseReport>, expenseReport: ExpenseReport) {
    await updateDoc(reference, expenseReport);
    this.snackbarService.open('Expense report updated');
  }

  getRealTime(callback: (snapshot: QuerySnapshot<ExpenseReport>) => void) {
    return onSnapshot(this.collection, callback);
  }
}
