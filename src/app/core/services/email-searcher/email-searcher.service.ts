import {
  Observable, of,
} from 'rxjs';
import { Injectable } from '@angular/core';
import { Functions, httpsCallableData } from '@angular/fire/functions';
import { AuthService } from '../auth/auth.service';
import { SearchResult } from './search-result';

@Injectable({
  providedIn: 'root',
})
export class EmailSearcherService {
  private readonly endpoint = 'searchRegisteredEmail';

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

    return httpsCallableData<string, SearchResult[]>(this.functions, this.endpoint)(query);
  }
}
