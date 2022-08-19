import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExpenseReportComponent } from './expense-report.component';
import { CategoryShowComponent } from './category/components/category-show/category-show.component';

const routes: Routes = [
  {
    path: ':expenseReportId',
    component: ExpenseReportComponent,
  },
  {
    path: ':expenseReportId/category/:categoryId',
    component: CategoryShowComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExpenseReportRoutingModule { }
