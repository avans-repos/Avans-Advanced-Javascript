import { AuthService } from 'src/app/core/services/auth/auth.service';
import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent {
  readonly isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay(),
    );

  readonly isLoggedIn$ = this.authService.isLoggedIn;

  readonly authState$ = this.authService.authState;

  constructor(private breakpointObserver: BreakpointObserver, private authService: AuthService) {}

  logout() {
    this.authService.logout();
  }
}
