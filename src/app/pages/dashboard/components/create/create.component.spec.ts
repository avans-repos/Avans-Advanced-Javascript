import { ExpenseReport } from 'src/app/core/models/expense-report';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ExpenseReportService } from 'src/app/core/services/expense-report/expense-report.service';
import { CreateComponent } from './create.component';
import { DocumentReference } from '@angular/fire/firestore';

describe('CreateComponent', () => {
  let component: CreateComponent;
  let fixture: ComponentFixture<CreateComponent>;

  beforeEach(() => {
    const matDialogRefStub = () => ({ close: () => ({}) });
    const expenseReportServiceStub = () => ({
      update: (reference: DocumentReference, updatedDoc: ExpenseReport) => ({}),
      add: (value: ExpenseReport) => ({})
    });
    const documentStub = () => ({ reference: {}, expenseReport: {} });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [CreateComponent],
      providers: [
        { provide: MatDialogRef, useFactory: matDialogRefStub },
        { provide: ExpenseReportService, useFactory: expenseReportServiceStub },
        { provide: Document, useFactory: documentStub }
      ]
    });
    fixture = TestBed.createComponent(CreateComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`isEdit has default value`, () => {
    expect(component.isEdit).toEqual(false);
  });

  describe('discard', () => {
    it('makes expected calls', () => {
      const matDialogRefStub: MatDialogRef<CreateComponent> = fixture.debugElement.injector.get(
        MatDialogRef
      );
      spyOn(matDialogRefStub, 'close').and.callThrough();
      component.discard();
      expect(matDialogRefStub.close).toHaveBeenCalled();
    });
  });
});
