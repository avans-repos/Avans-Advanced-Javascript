import { DocumentData } from '@angular/fire/firestore';
import { TransactionType } from './enum/transaction-type';

interface Transaction extends DocumentData {
  id: string | undefined;
  date: string;
  type: TransactionType;
  isArchived: boolean;
}

export { Transaction };
