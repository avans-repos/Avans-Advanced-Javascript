import { map, skip } from 'rxjs/operators';
import { FirebaseError } from '@angular/fire/app';
import { Injectable } from '@angular/core';
import {
  Auth, authState, createUserWithEmailAndPassword, signInWithEmailAndPassword,
} from '@angular/fire/auth';
import AuthErrors from './auth-error-messages';
import { FirebaseAuthError } from '../../models/firebase-auth-error';
import { SnackbarService } from '../snackbar/snackbar.service';

/**
 * Auth service which provides authentication functionality
 * @class AuthService
 */
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private auth: Auth, private snackbarService: SnackbarService) {
    // Send user notification on login but do not report initial state
    this.authState.pipe(skip(1))
      .subscribe((user) => {
        if (user) {
          this.snackbarService.open('You\'ve been logged in');
        } else {
          this.snackbarService.open('You have been logged out');
        }
      });
  }

  get authState() {
    return authState(this.auth);
  }

  get currentUser() {
    return this.auth.currentUser;
  }

  get isLoggedIn() {
    return authState(this.auth).pipe(map((user) => !!user));
  }

  private static errorHandler = (error: FirebaseError) => {
    // Inject error message
    const message = AuthErrors[error.code as keyof typeof AuthErrors];
    // eslint-disable-next-line no-param-reassign
    error.customData = { message };
    throw error as FirebaseAuthError;
  };

  async register(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password)
      .catch(AuthService.errorHandler);
  }

  async login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password)
      .catch(AuthService.errorHandler);
  }

  async logout() {
    return this.auth.signOut()
      .catch(AuthService.errorHandler);
  }
}
