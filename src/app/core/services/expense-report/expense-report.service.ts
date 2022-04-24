import { Injectable } from '@angular/core';
import { addDoc, Firestore, CollectionReference, collection, onSnapshot, QuerySnapshot, Timestamp } from '@angular/fire/firestore';
import { DocumentReference, updateDoc } from '@firebase/firestore';
import { ExpenseReport } from '../../models/expense-report';
import { SnackbarService } from '../snackbar/snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class ExpenseReportService {

  public readonly collection: CollectionReference<ExpenseReport>;

  constructor(
    fire: Firestore,
    private snackbarService: SnackbarService,
    ) {
    this.collection = collection(fire, 'expense-reports') as CollectionReference<ExpenseReport>;
  }

  async add(expenseReport: ExpenseReport) {
    expenseReport.createdAt = Timestamp.now();
    const doc = await addDoc(this.collection, expenseReport);
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
