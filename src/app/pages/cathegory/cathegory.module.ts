import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CathegoryRoutingModule } from './cathegory-routing.module';
import { CathegoryComponent } from './cathegory.component';

@NgModule({
  declarations: [
    CathegoryComponent,
  ],
  imports: [
    CommonModule,
    CathegoryRoutingModule,
  ],
})
export class CathegoryModule { }
