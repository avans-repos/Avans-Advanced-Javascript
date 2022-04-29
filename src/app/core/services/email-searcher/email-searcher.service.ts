import {
  concatMap, defer, Observable, of,
} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';

interface SearchResult {
  uid: string;
  email: string;
}

@Injectable({
  providedIn: 'root',
})
export class EmailSearcherService {
  private readonly searchUrl = 'https://europe-west1-avans-adweb.cloudfunctions.net/searchRegisteredEmail?query=';
  // private readonly searchUrl = 'http://localhost:5001/avans-adweb/europe-west1/searchRegisteredEmail?query=';

  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) { }

  search(query: string): Observable<SearchResult[]> {
    // Check if user is authenticated through Firebase
    const user = this.authService.currentUser;
    if (user === null) {
      return of([]);
    }

    const tokenOf = defer(() => user.getIdToken());

    return tokenOf.pipe(
      // Send request with token
      concatMap((token) => this.http.get<SearchResult[]>(this.searchUrl + query, {
        headers: {
          Authorization: `Bearer ${token}`,
          ContentType: 'application/json',
        },
      })),
    );
  }
}
