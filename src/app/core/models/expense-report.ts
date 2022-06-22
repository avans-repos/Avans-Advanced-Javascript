import { DocumentData, Timestamp } from '@angular/fire/firestore';
import { Transaction } from './transaction';

interface ExpenseReport extends DocumentData {
  id: string | undefined;
  name: string;
  description: string;
  createdAt: Timestamp;
  createdBy: string;
  members: string[]; // uid of members
  isArchived: boolean;
  transactions: Transaction[];
}

export { ExpenseReport };
