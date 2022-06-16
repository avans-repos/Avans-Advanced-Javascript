import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

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
})
export class ExpenseReportModule { }
