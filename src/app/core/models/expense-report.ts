import { DocumentData, Timestamp } from '@angular/fire/firestore';

interface ExpenseReport extends DocumentData {
  id: string | undefined;
  name: string;
  description: string;
  createdAt: Timestamp;
  createdBy: string;
  members: string[]; // uid of members
  isArchived: boolean;
}

export { ExpenseReport };
