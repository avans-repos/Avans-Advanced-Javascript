import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/core/models/catogory';
import { BehaviorSubject, switchMap, Observable } from 'rxjs';
import { CategoryService } from 'src/app/core/services/category/category.service';
import { MatDialog } from '@angular/material/dialog';
import { where } from '@angular/fire/firestore';
import { CreateComponent } from './components/create/create.component';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  public categories: Observable<Category[]>;

  public viewArchived = new BehaviorSubject<boolean>(false);

  public isLoading = true;

  constructor(categoryService: CategoryService, public dialog: MatDialog) {
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
    this.dialog.open(CreateComponent, {
      width: '500px',
    });
  }

  toggleViewArchived() {
    this.isLoading = true;
    this.viewArchived.next(!this.viewArchived.getValue());
  }
}
