import { Category } from 'src/app/core/models/catogory';
import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Required } from 'src/app/core/decorators/required-input';
import { CategoryService } from 'src/app/core/services/category/category.service';
import { CreateCategoryComponent } from '../create-category/create-category.component';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss'],
})
export class ListItemComponent {
  constructor(private categoryService: CategoryService) {
    this.spendbudget = categoryService.getSpendBudget();
    this.expenseReportId = categoryService.expenseReportId;
  }

  public spendbudget: number;

  public expenseReportId: string;

  @Input() @Required category!: Category;

  @Input() @Required dialog!: MatDialog;

  editCategory() {
    this.dialog.open(CreateCategoryComponent, {
      width: '500px',
      data: {
        category: this.category,
        categoryService: this.categoryService,
      },
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
