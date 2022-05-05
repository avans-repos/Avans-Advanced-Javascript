import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ExpenseReportService } from 'src/app/core/services/expense-report/expense-report.service';
import { Document } from './models/document';
import { DashboardComponent } from './dashboard.component';
import { QuerySnapshot } from '@angular/fire/firestore';
import { ExpenseReport } from 'src/app/core/models/expense-report';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(() => {
    const matDialogStub = () => ({ open: (createComponent: object, object: object) => ({}) });
    const expenseReportServiceStub = () => ({ getRealTime: (function0: QuerySnapshot<ExpenseReport>) => ({}) });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [DashboardComponent],
      providers: [
        { provide: MatDialog, useFactory: matDialogStub },
        { provide: ExpenseReportService, useFactory: expenseReportServiceStub }
      ]
    });
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`documents has default value`, () => {
    expect(component.documents).toEqual([]);
  });

  describe('editExpenseReport', () => {
    it('makes expected calls', () => {
      const matDialogStub: MatDialog = fixture.debugElement.injector.get(
        MatDialog
      );
      const documentStub: Document = <any>{};
      spyOn(matDialogStub, 'open').and.callThrough();
      component.editExpenseReport(documentStub);
      expect(matDialogStub.open).toHaveBeenCalled();
    });
  });

  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      const expenseReportServiceStub: ExpenseReportService = fixture.debugElement.injector.get(
        ExpenseReportService
      );
      spyOn(expenseReportServiceStub, 'getRealTime').and.callThrough();
      component.ngOnInit();
      expect(expenseReportServiceStub.getRealTime).toHaveBeenCalled();
    });
  });

  describe('createExpenseReport', () => {
    it('makes expected calls', () => {
      const matDialogStub: MatDialog = fixture.debugElement.injector.get(
        MatDialog
      );
      spyOn(matDialogStub, 'open').and.callThrough();
      component.createExpenseReport();
      expect(matDialogStub.open).toHaveBeenCalled();
    });
  });
});
