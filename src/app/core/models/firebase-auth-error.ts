import { FirebaseError } from '@angular/fire/app';
export class FirebaseAuthError extends FirebaseError {
  public override customData!: { message: string; };
}
