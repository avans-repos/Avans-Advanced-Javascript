import { TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarService } from './snackbar.service';

describe('SnackbarService', () => {
  let service: SnackbarService;

  beforeEach(() => {
    const matSnackBarStub = () => ({ open: (message: string, action: string, duration: number) => ({}) });
    TestBed.configureTestingModule({
      providers: [
        SnackbarService,
        { provide: MatSnackBar, useFactory: matSnackBarStub }
      ]
    });
    service = TestBed.inject(SnackbarService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });
});
