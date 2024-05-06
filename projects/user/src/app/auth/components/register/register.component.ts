import { CreateAccountService } from './../../services/create-account.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { validatePassword } from './validators/password-validator';
import { ToastrService } from 'ngx-toastr';
import { UserRegisteration } from '../../constants/DTOs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerationForm!: FormGroup;
  username!: FormControl;
  email!: FormControl;
  password!: FormControl;
  confirmPassword!: FormControl;
  constructor(
    private createAccountService: CreateAccountService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.initFormControls();
    this.createForm();
  }

  initFormControls() {
    this.username = new FormControl('', Validators.required);
    this.email = new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.pattern('.*com'),
    ]);
    this.password = new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]);
    this.confirmPassword = new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]);
  }

  createForm() {
    this.registerationForm = new FormGroup(
      {
        userName: this.username,
        email: this.email,
        password: this.password,
        confirmPassword: this.confirmPassword,
      },
      validatePassword('password', 'confirmPassword')
    );
  }

  createAccount() {
    const model: UserRegisteration = {
      email: this.email.value,
      password: this.password.value,
      username: this.username.value,
      role: 'user',
    };
    this.createAccountService.createAccount(model).subscribe(
      () => {
        this.toastr.success('Account created Successfully');
        this.registerationForm.reset();
      },
      (error) => {
        this.toastr.error(error.error.message);
      }
    );
  }
}
