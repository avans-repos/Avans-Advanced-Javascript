import { map } from 'rxjs/operators';
import { FirebaseError } from '@angular/fire/app';
import { Injectable } from '@angular/core';
import { Auth, authState, createUserWithEmailAndPassword, onAuthStateChanged } from '@angular/fire/auth';
import { NextOrObserver, signInWithEmailAndPassword, User } from '@firebase/auth';
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

  constructor(private auth: Auth) { }

  authStateChanged(subscriber: NextOrObserver<User>) {
    return onAuthStateChanged(this.auth, subscriber);
  }

  get isLoggedIn() {
    return authState(this.auth).pipe(map(user => !!user));
  }

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
