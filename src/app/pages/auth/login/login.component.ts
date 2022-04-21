import { Component } from '@angular/core';
import { FirebaseError } from '@angular/fire/app';
import { AuthErrorCodes } from '@angular/fire/auth';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseAuthError } from 'src/app/core/models/firebase-auth-error';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(private authService: AuthService, private router: Router) { }

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
    ]),
  });

  get email() {
    return this.form.controls['email'];
  }
  get password() {
    return this.form.controls['password'];
  }

  submit() {
    this.authService.login(this.email.value, this.password.value)
      .then(() => {
        this.router.navigate(['/']);
      })
      .catch((err: FirebaseAuthError) => {
        this.form.setErrors({
          submitError: err.customData.message,
        });
      });
  }
}
