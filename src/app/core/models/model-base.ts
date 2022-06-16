import { DocumentData } from '@angular/fire/firestore';

interface ModelBase extends DocumentData {
  id: string | undefined;
}

export { ModelBase };
