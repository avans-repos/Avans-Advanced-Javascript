import { TestBed } from '@angular/core/testing';
import { Auth } from '@angular/fire/auth';
import { SnackbarService } from '../snackbar/snackbar.service';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    const authStub = () => ({ signOut: () => ({ catch: () => ({}) }) });
    const snackbarServiceStub = () => ({ open: (string: string) => ({}) });
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: Auth, useFactory: authStub },
        { provide: SnackbarService, useFactory: snackbarServiceStub }
      ]
    });
    service = TestBed.inject(AuthService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

  describe('logout', () => {
    it('makes expected calls', () => {
      const authStub: Auth = TestBed.inject(Auth);
      spyOn(authStub, 'signOut').and.callThrough();
      service.logout();
      expect(authStub.signOut).toHaveBeenCalled();
    });
  });
});
