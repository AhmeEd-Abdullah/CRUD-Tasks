import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'projects/admin/src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  constructor(private http: HttpClient) {}
  getAllTasks(obj: any) {
    let params = new HttpParams();
    for (const key in obj) {
      if (obj[key]) {
        params = params.append(key, obj[key]);
      }
    }
    return this.http.get(`${environment.baseApi}/tasks/all-tasks`, { params });
  }

  addTask(model: any) {
    return this.http.post(`${environment.baseApi}/tasks/add-task`, model);
  }

  deleteTask(id: any) {
    return this.http.delete(`${environment.baseApi}/tasks/delete-task/${id}`);
  }

  updateTask(id: any, model: any) {
    return this.http.put(`${environment.baseApi}/tasks/edit-task/${id}`, model);
  }
}
