import { Component, OnInit } from '@angular/core';
import { TasksService } from '../../services/tasks.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss'],
})
export class TaskDetailsComponent implements OnInit {
  taskId!: string;
  taskData: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private taskService: TasksService,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.getTaskDetails();
  }

  getTaskDetails() {
    this.taskId = this.activatedRoute.snapshot.params['id'];
    this.taskService.taskDetails(this.taskId).subscribe((res: any) => {
      this.taskData = res.tasks;
    });
  }

  completeTask() {
    let model = {
      id: this.taskId,
    };
    this.taskService.completeTask(model).subscribe((res: any) => {
      this.toastr.success(res.massage);
      this.router.navigate(['/tasks']);
    });
  }
}
