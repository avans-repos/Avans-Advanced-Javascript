import { Category } from 'src/app/core/models/cathory';
import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Required } from 'src/app/core/decorators/required-input';
import { CategoryService } from 'src/app/core/services/category/category.service';
import { CreateComponent } from '../create/create.component';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss'],
})
export class ListItemComponent {
  constructor(private categoryService: CategoryService) {
    this.spendbudget = categoryService.getSpendBudget();
  }

  public spendbudget: number;

  @Input() @Required category!: Category;

  @Input() @Required dialog!: MatDialog;

  editCategory() {
    this.dialog.open(CreateComponent, {
      width: '500px',
      data: this.category,
    });
  }

  async archiveCategory() {
    this.category.isArchived = !this.category.isArchived;

    this.categoryService.getDoc(this.category.id!).subscribe({
      next: (docRef) => this.categoryService.update(docRef, this.category),
      error: () => { this.category.isArchived = !this.category.isArchived; },
    });
  }
}
