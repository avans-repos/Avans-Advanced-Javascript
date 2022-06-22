import { Timestamp } from '@angular/fire/firestore';
import { ModelBase } from './model-base';

interface Cathegory extends ModelBase {
  name: string;
  maxBudget: number;
  endDate: Timestamp | null;
}

export { Cathegory };
