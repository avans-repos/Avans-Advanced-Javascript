import { DocumentData, DocumentReference, Timestamp } from '@angular/fire/firestore';

interface ExpenseReport extends DocumentData {
  name: string;
  description: string;
  createdAt: Timestamp;
  createdBy: string;
  members: string[]; // uid of members
  documentReference: DocumentReference<ExpenseReport>;
}

export { ExpenseReport };
