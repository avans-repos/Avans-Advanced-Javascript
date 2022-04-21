import { FirebaseService } from './../../../core/services/firebase/firebase.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private firebaseService: FirebaseService) {}

  form: FormGroup = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email,
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
    ]),
  });

  ngOnInit() {}

  login() {
    this.firebaseService.login(this.form.value.email, this.form.value.password)
  }
}
