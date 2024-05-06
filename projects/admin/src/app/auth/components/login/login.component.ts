import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private LoginService: LoginService,
    private toastr: ToastrService,
    private router: Router,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.createForm();
    if (localStorage.getItem('token')) {
      localStorage.removeItem('token');
    }
  }

  createForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(20),
        ],
      ],
      role: 'admin',
    });
  }

  Login() {
    this.LoginService.login(this.loginForm.value).subscribe((res: any) => {
      localStorage.setItem('token', res['token']);
      this.router.navigate(['/dashboard']);
      this.toastr.success(this.translate.instant('auth.success'));
    });
  }
}
