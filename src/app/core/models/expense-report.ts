import { DocumentData, DocumentReference, Timestamp } from '@angular/fire/firestore';

interface ExpenseReport extends DocumentData {
  name: string;
  description: string;
  createdAt: Timestamp;
  createdBy: string;
  documentReference: DocumentReference<ExpenseReport>;
}

export { ExpenseReport };
