import { DocumentData, DocumentReference, Timestamp } from '@angular/fire/firestore';

interface Cathegory extends DocumentData {
  id: string | undefined;
  name: string;
  maxBudget: number;
  endDate: Timestamp;
  createdAt: Timestamp;
  createdBy: string;
  documentReference: DocumentReference<Cathegory>;
  isArchived: boolean;
}

export { Cathegory };
