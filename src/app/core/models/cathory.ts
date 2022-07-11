import { Timestamp } from '@angular/fire/firestore';
import { ModelBase } from './model-base';

interface Category extends ModelBase {
  name: string;
  maxBudget: number;
  endDate: Timestamp | null;
  expenseReportId: string;
  isArchived: boolean;
}

export { Category };
