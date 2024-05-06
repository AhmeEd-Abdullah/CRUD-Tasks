import { LoginService } from './../../services/login.service';
import { Component, OnInit } from '@angular/core';
import { UserLogin } from '../../constants/DTOs';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  email!: string;
  password!: string;
  constructor(
    private loginService: LoginService,
    private toastr: ToastrService,
    private router: Router,
    private transalte: TranslateService
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      localStorage.removeItem('token');
    }
  }
  login() {
    const model: UserLogin = {
      email: this.email,
      password: this.password,
      role: 'user',
    };
    this.loginService.login(model).subscribe(
      (res: any) => {
        localStorage.setItem('token', res['token']);
        this.router.navigate(['/tasks']);
        this.toastr.success(this.transalte.instant('auth.success'));
      },
      (error) => {
        this.toastr.error(error.error?.message);
      }
    );
  }
}
