import { Cathegory } from 'src/app/core/models/cathory';
import { DocumentReference, Timestamp } from '@angular/fire/firestore';
import { ModelBase } from './model-base';

interface Transaction extends ModelBase {
  amount: number;
  isIncome: boolean;
  date: Timestamp;
  cathegoryId: string | null;
  cathegory: DocumentReference<Cathegory>;
}

export { Transaction };
