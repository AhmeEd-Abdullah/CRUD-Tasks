import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'projects/admin/src/environments/environment';
import { BehaviorSubject } from 'rxjs';

export interface userStatus {
  id: string;
  status: string;
}

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}
  usersData: BehaviorSubject<any> = new BehaviorSubject({});

  getAllUsers(name: any) {
    return this.http.get(`${environment.baseApi}/auth/users`, {
      params: name,
    });
  }

  getUsersData(model?: any) {
    this.getAllUsers(model).subscribe((res: any) => {
      this.usersData.next({
        data: res.users,
      });
    });
  }

  deleteUser(id: string) {
    return this.http.delete(`${environment.baseApi}/auth/user/${id}`);
  }

  changeStatus(body: userStatus) {
    return this.http.put(`${environment.baseApi}/auth/user-status`, body);
  }
}
