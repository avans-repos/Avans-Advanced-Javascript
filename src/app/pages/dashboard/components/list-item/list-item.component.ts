import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Required } from 'src/app/core/decorators/required-input';
import { Document } from '../../models/document';
import { CreateComponent } from '../create/create.component';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss'],
})
export class ListItemComponent {
  @Input() @Required document!: Document;

  @Input() @Required dialog!: MatDialog;

  editExpenseReport() {
    this.dialog.open(CreateComponent, {
      width: '500px',
      data: {
        expenseReport: this.document.expenseReport,
        reference: this.document.reference,
      },
    });
  }
}
