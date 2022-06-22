import { Cathegory } from 'src/app/core/models/cathory';
import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Required } from 'src/app/core/decorators/required-input';
import { CreateComponent } from '../create/create.component';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss'],
})
export class ListItemComponent {
  @Input() @Required cathegory!: Cathegory;

  @Input() @Required dialog!: MatDialog;

  editCathegory() {
    this.dialog.open(CreateComponent, {
      width: '500px',
      data: this.cathegory,
    });
  }
}
