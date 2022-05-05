import { TestBed } from '@angular/core/testing';
import { Firestore } from '@angular/fire/firestore';
import { DocumentReference } from '@angular/fire/firestore';
import { ExpenseReport } from '../../models/expense-report';
import { AuthService } from '../auth/auth.service';
import { SnackbarService } from '../snackbar/snackbar.service';
import { ExpenseReportService } from './expense-report.service';

describe('ExpenseReportService', () => {
  let service: ExpenseReportService;

  beforeEach(() => {
    const firestoreStub = () => ({});
    const authServiceStub = () => ({ currentUser: {} });
    const snackbarServiceStub = () => ({ open: (string: string) => ({}) });
    TestBed.configureTestingModule({
      providers: [
        ExpenseReportService,
        { provide: Firestore, useFactory: firestoreStub },
        { provide: AuthService, useFactory: authServiceStub },
        { provide: SnackbarService, useFactory: snackbarServiceStub }
      ]
    });
    service = TestBed.inject(ExpenseReportService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

  describe('add', () => {
    it('makes expected calls', () => {
      const expenseReportStub: ExpenseReport = <any>{};
      const snackbarServiceStub: SnackbarService = TestBed.inject(
        SnackbarService
      );
      spyOn(snackbarServiceStub, 'open').and.callThrough();
      service.add(expenseReportStub);
      expect(snackbarServiceStub.open).toHaveBeenCalled();
    });
  });

  describe('update', () => {
    it('makes expected calls', () => {
      const documentReferenceStub: DocumentReference<ExpenseReport> = <any>{};
      const expenseReportStub: ExpenseReport = <any>{};
      const snackbarServiceStub: SnackbarService = TestBed.inject(
        SnackbarService
      );
      spyOn(snackbarServiceStub, 'open').and.callThrough();
      service.update(documentReferenceStub, expenseReportStub);
      expect(snackbarServiceStub.open).toHaveBeenCalled();
    });
  });
});
