import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent {

  form = new FormGroup({
    name: new FormControl('', [
      Validators.required,
    ]),
    description: new FormControl(''),
  });

  get name() {
    return this.form.controls['name'];
  }

  constructor(
    public dialogRef: MatDialogRef<CreateComponent>,
  ) {}

  discard(): void {
    this.dialogRef.close();
  }

  submit() {
    // TODO: Send form to firestore
  }
}
