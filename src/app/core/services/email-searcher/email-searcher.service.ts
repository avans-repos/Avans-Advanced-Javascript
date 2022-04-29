import {
  Observable, of,
} from 'rxjs';
import { Injectable } from '@angular/core';
import { Functions, httpsCallableData } from '@angular/fire/functions';
import { AuthService } from '../auth/auth.service';

interface SearchResult {
  uid: string;
  email: string;
}

@Injectable({
  providedIn: 'root',
})
export class EmailSearcherService {
  constructor(
    private authService: AuthService,
    private functions: Functions,
  ) { }

  search(query: string): Observable<SearchResult[]> {
    // Check if user is authenticated through Firebase
    const user = this.authService.currentUser;
    if (user === null) {
      return of([]);
    }

    return httpsCallableData<string, SearchResult[]>(this.functions, 'searchRegisteredEmail').call({ query });
  }
}
