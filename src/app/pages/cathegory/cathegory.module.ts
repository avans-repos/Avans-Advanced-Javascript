import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { CathegoryRoutingModule } from './cathegory-routing.module';
import { CathegoryComponent } from './cathegory.component';
import { CreateComponent } from './components/create/create.component';
import { ListItemComponent } from './components/list-item/list-item.component';

@NgModule({
  declarations: [
    CathegoryComponent,
    CreateComponent,
    ListItemComponent,
  ],
  imports: [
    CommonModule,
    CathegoryRoutingModule,
    MatIconModule,
    MatListModule,
  ],
})
export class CathegoryModule { }
