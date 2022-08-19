import { CategoryServiceFactory } from 'src/app/core/services/category/category-service.factory';
import { Component, Inject, OnInit } from '@angular/core';
import { Category } from 'src/app/core/models/catogory';
import { BehaviorSubject, switchMap, Observable } from 'rxjs';
import { CategoryService } from 'src/app/core/services/category/category.service';
import { MatDialog } from '@angular/material/dialog';
import { where } from '@angular/fire/firestore';
import { CreateCategoryComponent } from './components/create-category/create-category.component';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
  providers: [CategoryServiceFactory],
})
export class CategoryComponent implements OnInit {
  public categories: Observable<Category[]>;

  public viewArchived = new BehaviorSubject<boolean>(false);

  public isLoading = true;

  constructor(
    @Inject(CategoryService) private categoryService: CategoryService,
    public dialog: MatDialog,
  ) {
    this.categories = this.viewArchived.pipe(
      switchMap((viewArchived) => categoryService.getRealTime(
        where('isArchived', '==', viewArchived),
      )),
    );
  }

  ngOnInit(): void {
    this.categories.subscribe(() => { this.isLoading = false; });
  }

  createCategory() {
    this.dialog.open(CreateCategoryComponent, {
      width: '500px',
      data: {
        categoryService: this.categoryService,
      },
    });
  }

  toggleViewArchived() {
    this.isLoading = true;
    this.viewArchived.next(!this.viewArchived.getValue());
  }
}
