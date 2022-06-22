import { DocumentData, Timestamp } from '@angular/fire/firestore';

interface Transaction extends DocumentData {
  id: string | undefined;
  amount: number;
  isIncome: boolean;
  date: Timestamp;
}

export { Transaction };
