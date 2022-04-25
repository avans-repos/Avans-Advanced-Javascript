import { DocumentData, DocumentReference, Timestamp } from '@firebase/firestore';

class ExpenseReport implements DocumentData {
  name: string | undefined;

  description: string | undefined;

  createdAt: Timestamp = Timestamp.now();

  createdBy: string | undefined;

  documentReference: DocumentReference<ExpenseReport> | undefined;
}

export { ExpenseReport };
