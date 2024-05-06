import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'projects/user/src/environments/environment';
import { UserRegisteration } from '../constants/DTOs';

@Injectable({
  providedIn: 'root',
})
export class CreateAccountService {
  constructor(private http: HttpClient) {}

  createAccount(body: UserRegisteration) {
    return this.http.post(`${environment.baseApi}/auth/createAccount`, body);
  }
}
