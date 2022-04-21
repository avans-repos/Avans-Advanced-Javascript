import { FirebaseError } from '@angular/fire/app';
import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { signInWithEmailAndPassword } from '@firebase/auth';
import AuthErrors from './auth-error-messages';
import { FirebaseAuthError } from '../../models/firebase-auth-error';


/**
 * Auth service which provides authentication functionality
 * @class AuthService
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: Auth) {}

  async register(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  async login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password)
      .catch((error: FirebaseError) => {
        // Inject error message
        const message = AuthErrors[error.code as keyof typeof AuthErrors];
        error.customData = {message};
        throw error as FirebaseAuthError;
      });
  }

  async logout() {
    return this.auth.signOut();
  }
}
