import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CathegoryComponent } from './cathegory.component';

const routes: Routes = [{ path: '', component: CathegoryComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CathegoryRoutingModule { }
