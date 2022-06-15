import { Injectable } from '@angular/core';
import {
  addDoc, Firestore, CollectionReference, collection, Timestamp,
  DocumentReference, updateDoc, query, QueryConstraint, collectionData, doc, where,
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

  getRealTime(...predicates: QueryConstraint[]) {
    return collectionData(
      query(
        this.collection,
        where('members', 'array-contains', this.authService.currentUser?.uid),
        ...predicates,
      ),
      {
        idField: 'id',
      },
    );
  }

  async add(expenseReport: ExpenseReport) {
    try {
      const filledExpenseReport = {
        ...expenseReport,
        createdAt: Timestamp.now(),
        createdBy: this.authService.currentUser?.uid,
        isArchived: false,
      };

      delete filledExpenseReport.id;

      filledExpenseReport.members.push(this.authService.currentUser?.uid!);

      const newDoc = await addDoc(this.collection, filledExpenseReport);
      this.snackbarService.open('Expense report created');
      return newDoc;
    } catch (error) {
      this.errorHandler(error);
    }

    return null;
  }

  async createDocumentReference(id: string) {
    return doc(this.collection, id);
  }

  async update(reference: DocumentReference<ExpenseReport>, expenseReport: ExpenseReport) {
    // eslint-disable-next-line no-param-reassign
    delete expenseReport.id;

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
