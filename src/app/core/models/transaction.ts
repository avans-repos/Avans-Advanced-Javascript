import { Timestamp } from '@angular/fire/firestore';
import { ModelBase } from './model-base';

interface Transaction extends ModelBase {
  amount: number;
  isIncome: boolean;
  date: Timestamp;
}

export { Transaction };
