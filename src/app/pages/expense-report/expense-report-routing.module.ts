import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExpenseReportComponent } from './expense-report.component';
import { CategoryComponent } from './category/category.component';

const routes: Routes = [
  {
    path: ':expenseReportId',
    component: ExpenseReportComponent,
  },
  {
    path: ':expenseReportId/category',
    component: CategoryComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExpenseReportRoutingModule { }
