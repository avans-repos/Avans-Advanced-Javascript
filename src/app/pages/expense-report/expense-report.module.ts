import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { TransactionService } from '../../core/services/transaction/transaction.service';
import { ExpenseReportRoutingModule } from './expense-report-routing.module';
import { ExpenseReportComponent } from './expense-report.component';
import { CreateComponent } from './components/create/create.component';

@NgModule({
  declarations: [
    ExpenseReportComponent,
    CreateComponent,
  ],
  imports: [
    CommonModule,
    ExpenseReportRoutingModule,
    MatCardModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSlideToggleModule,
    MatDatepickerModule,
  ],
  providers: [
    TransactionService,
  ],
})
export class ExpenseReportModule { }
