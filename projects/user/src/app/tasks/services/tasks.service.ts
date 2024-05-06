import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'projects/user/src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  constructor(private http: HttpClient) {}

  getUserTasks(id: string, params: any) {
    return this.http.get(`${environment.baseApi}/tasks/user-tasks/${id}`, {
      params: params,
    });
  }

  completeTask(body: any) {
    return this.http.put(`${environment.baseApi}/tasks/complete`, body);
  }

  taskDetails(id: string) {
    return this.http.get(`${environment.baseApi}/tasks/task/${id}`);
  }
}
