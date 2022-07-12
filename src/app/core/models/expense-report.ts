import { DocumentData, Timestamp } from '@angular/fire/firestore';
import { Category } from './catogory';

interface ExpenseReport extends DocumentData {
  id: string | undefined;
  name: string;
  description: string;
  createdAt: Timestamp;
  createdBy: string;
  members: string[]; // uid of members
  isArchived: boolean;
  category: Category[];
}

export { ExpenseReport };
