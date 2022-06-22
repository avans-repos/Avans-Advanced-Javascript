import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionService } from '../../core/services/transaction/transaction.service';

import { ExpenseReportRoutingModule } from './expense-report-routing.module';
import { ExpenseReportComponent } from './expense-report.component';

@NgModule({
  declarations: [
    ExpenseReportComponent,
  ],
  imports: [
    CommonModule,
    ExpenseReportRoutingModule,
  ],
  providers: [
    TransactionService,
  ],
})
export class ExpenseReportModule { }
