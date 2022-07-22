import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable, of } from 'rxjs';
import { Category } from 'src/app/core/models/catogory';
import { CategoryService } from 'src/app/core/services/category/category.service';

@Component({
  selector: 'app-create',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.scss'],
})
export class CreateCategoryComponent {
  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    maxBudget: new FormControl(69, [Validators.required]),
    endDate: new FormControl(),
  });

  isEdit: boolean = false;

  get name() {
    return this.form.controls['name'];
  }

  readonly owner: Observable<string> = of('');

  constructor(
    private dialogRef: MatDialogRef<CreateCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public readonly data: {
      category: Category,
      categoryService: CategoryService,
    },
  ) {
    // If data is passed in, this is an edit
    if (data.category) {
      this.form.patchValue(data.category);
      this.isEdit = true;
    }
  }

  discard() {
    this.dialogRef.close();
  }

  async submit() {
    // Check if category is being edited
    if (this.isEdit && this.data.category) {
      // Inject original category and override with form data
      const updatedDoc = {
        ...this.data.category,
        ...this.form.value,
      };

      this.data.categoryService.getDoc(this.data.category.id!).subscribe(
        (docRef) => this.data.categoryService.update(docRef, updatedDoc),
      );
    } else {
      this.data.categoryService.add(this.form.value);
    }
    this.dialogRef.close();
  }

  membersUpdate(newMembers: string[]) {
    this.form.controls['members'].setValue(newMembers);
  }
}
