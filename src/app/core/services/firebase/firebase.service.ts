import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private authService: AngularFireAuth) { }


  get auth() {
    return this.authService.authState;
  }

  // Standard auth methods
  register(email: string, password: string) {
    // TODO: Handle errors with error message service
    return this.authService.createUserWithEmailAndPassword(email, password);
  }

  login(email: string, password: string) {
    // TODO: Handle errors with error message service
    return this.authService.signInWithEmailAndPassword(email, password);
  }

  logout() {
    // TODO: Handle errors with error message service
    return this.authService.signOut();
  }
}
