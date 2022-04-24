import { DocumentData, Timestamp } from '@firebase/firestore';

class ExpenseReport implements DocumentData {
  public name: string | undefined;
  public description: string | undefined;
  public createdAt: Timestamp = Timestamp.now();
}

export { ExpenseReport };
