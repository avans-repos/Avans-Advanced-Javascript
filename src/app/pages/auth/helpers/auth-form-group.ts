import { FormGroup, FormControl, Validators } from "@angular/forms";

const createAuthFormGroup = () => new FormGroup({
  email: new FormControl('', [Validators.required, Validators.email]),
  password: new FormControl('', [
    Validators.required,
    Validators.minLength(10),
  ]),
});

export default createAuthFormGroup;
