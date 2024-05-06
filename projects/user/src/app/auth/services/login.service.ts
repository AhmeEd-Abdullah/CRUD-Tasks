import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'projects/user/src/environments/environment';
import { UserLogin } from '../constants/DTOs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}

  login(body: UserLogin) {
    return this.http.post(`${environment.baseApi}/auth/login`, body);
  }
}
