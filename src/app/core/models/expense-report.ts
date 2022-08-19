import { Timestamp } from '@angular/fire/firestore';
import { Category } from './catogory';
import { ModelBase } from './model-base';

interface ExpenseReport extends ModelBase {
  name: string;
  description: string;
  createdAt: Timestamp;
  createdBy: string;
  members: string[]; // uid of members
  isArchived: boolean;
  categories: Category[];
}

export { ExpenseReport };
