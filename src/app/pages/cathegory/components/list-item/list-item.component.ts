import { Cathegory } from 'src/app/core/models/cathory';
import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Required } from 'src/app/core/decorators/required-input';
import { CathegoryService } from 'src/app/core/services/cathegory/cathegory.service';
import { CreateComponent } from '../create/create.component';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss'],
})
export class ListItemComponent {
  constructor(private cathegoryService: CathegoryService) {
    this.spendbudget = cathegoryService.getSpendBudget();
  }

  public spendbudget: number;

  @Input() @Required cathegory!: Cathegory;

  @Input() @Required dialog!: MatDialog;

  editCathegory() {
    this.dialog.open(CreateComponent, {
      width: '500px',
      data: this.cathegory,
    });
  }

  async archiveCathegory() {
    this.cathegory.isArchived = !this.cathegory.isArchived;

    this.cathegoryService.getDoc(this.cathegory.id!).subscribe({
      next: (docRef) => this.cathegoryService.update(docRef, this.cathegory),
      error: () => { this.cathegory.isArchived = !this.cathegory.isArchived; },
    });
  }
}
