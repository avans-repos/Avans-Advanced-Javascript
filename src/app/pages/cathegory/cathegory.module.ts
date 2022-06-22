import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
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
    MatFormFieldModule,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatNativeDateModule,
    MatInputModule,
    MatDialogModule,
  ],
})
export class CathegoryModule { }
