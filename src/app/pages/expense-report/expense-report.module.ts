import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';
import { TransactionService } from '../../core/services/transaction/transaction.service';
import { ExpenseReportRoutingModule } from './expense-report-routing.module';
import { ExpenseReportComponent } from './expense-report.component';
import { CreateComponent } from './components/create-transaction/create-transaction.component';
import { CreateCategoryComponent as CategoryCreateComponent } from './category/components/create-category/create-category.component';
import { MonthViewComponent } from './components/month-view/month-view.component';
import { LineChartMonthComponent } from './components/line-chart-month/line-chart-month.component';
import { CategoryComponent } from './category/category.component';
import { ListItemComponent } from './category/components/list-item/list-item.component';
import { CategoryShowComponent } from './category/components/category-show/category-show.component';

@NgModule({
  declarations: [
    ExpenseReportComponent,
    CreateComponent,
    MonthViewComponent,
    LineChartMonthComponent,
    CategoryComponent,
    ListItemComponent,
    CategoryCreateComponent,
    CategoryShowComponent,
  ],
  imports: [
    CommonModule,
    ExpenseReportRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    MatDatepickerModule,
    MatDialogModule,
    MatNativeDateModule,
    MatInputModule,
    MatIconModule,
    MatTooltipModule,
    NgxChartsModule,
    MatOptionModule,
    MatSelectModule,
    MatListModule,
  ],
  providers: [
    TransactionService,
  ],
})
export class ExpenseReportModule { }
