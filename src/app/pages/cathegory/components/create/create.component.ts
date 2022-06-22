import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable, of } from 'rxjs';
import { Cathegory } from 'src/app/core/models/cathory';
import { CathegoryService } from 'src/app/core/services/cathegory/cathegory.service';

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
    @Inject(MAT_DIALOG_DATA) public readonly data: Cathegory,
    private cathegoryService: CathegoryService,
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
    // Check if cathegory is being edited
    if (this.isEdit && this.data) {
      // Inject original cathegory and override with form data
      const updatedDoc = {
        ...this.data,
        ...this.form.value,
      };

      this.cathegoryService.getDoc(this.data.id!).subscribe(
        (docRef) => this.cathegoryService.update(docRef, updatedDoc),
      );
    } else {
      this.cathegoryService.add(this.form.value);
    }
    this.dialogRef.close();
  }

  membersUpdate(newMembers: string[]) {
    this.form.controls['members'].setValue(newMembers);
  }
}
