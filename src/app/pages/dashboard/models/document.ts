import { DocumentReference } from '@angular/fire/firestore';
import { ExpenseReport } from 'src/app/core/models/expense-report';

export interface Document {
  reference: DocumentReference<ExpenseReport>;
  expenseReport: ExpenseReport;
}
