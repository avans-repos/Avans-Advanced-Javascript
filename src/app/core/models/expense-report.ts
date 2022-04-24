import { DocumentData, Timestamp, DocumentReference } from '@firebase/firestore';

class ExpenseReport implements DocumentData {
  name: string | undefined;
  description: string | undefined;
  createdAt: Timestamp = Timestamp.now();
  documentReference: DocumentReference<ExpenseReport> | undefined;
}

export { ExpenseReport };
