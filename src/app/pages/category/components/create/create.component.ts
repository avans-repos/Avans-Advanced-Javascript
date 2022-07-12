import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable, of } from 'rxjs';
import { Category } from 'src/app/core/models/catogory';
import { CategoryService } from 'src/app/core/services/category/category.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent {
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
    private dialogRef: MatDialogRef<CreateComponent>,
    @Inject(MAT_DIALOG_DATA) public readonly data: Category,
    private categoryService: CategoryService,
  ) {
    // If data is passed in, this is an edit
    if (data) {
      this.form.patchValue(data);
      this.isEdit = true;
    }
  }

  discard() {
    this.dialogRef.close();
  }

  async submit() {
    // Check if category is being edited
    if (this.isEdit && this.data) {
      // Inject original category and override with form data
      const updatedDoc = {
        ...this.data,
        ...this.form.value,
      };

      this.categoryService.getDoc(this.data.id!).subscribe(
        (docRef) => this.categoryService.update(docRef, updatedDoc),
      );
    } else {
      this.categoryService.add(this.form.value);
    }
    this.dialogRef.close();
  }

  membersUpdate(newMembers: string[]) {
    this.form.controls['members'].setValue(newMembers);
  }
}
