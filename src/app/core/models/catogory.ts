import { Timestamp } from '@angular/fire/firestore';
import { ModelBase } from './model-base';
import { Transaction } from './transaction';

interface Category extends ModelBase {
  name: string;
  maxBudget: number;
  endDate: Timestamp | null;
  isArchived: boolean;
  transactions: Transaction[];
}

export { Category };
