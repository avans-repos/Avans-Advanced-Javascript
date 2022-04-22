import { DocumentData } from '@firebase/firestore';

class ExpenseReport implements DocumentData {
  public name: string | undefined;
  public description: string | undefined;
}

export { ExpenseReport };
