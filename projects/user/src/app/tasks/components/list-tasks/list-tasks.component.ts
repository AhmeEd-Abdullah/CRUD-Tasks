import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TasksService } from '../../services/tasks.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-tasks',
  templateUrl: './list-tasks.component.html',
  styleUrls: ['./list-tasks.component.scss'],
})
export class ListTasksComponent implements OnInit {
  displayedColumns: string[] = [
    'position',
    'title',
    'user',
    'deadLineDate',
    'status',
    'actions',
  ];
  dataSource?: Array<any>;
  userData: any;
  tasksFilter!: FormGroup;
  taskStatus: string = 'In-Progress';
  users: any = [
    { name: 'Moahmed', id: 1 },
    { name: 'Ali', id: 2 },
    { name: 'Ahmed', id: 3 },
    { name: 'Zain', id: 4 },
  ];

  status: any = [
    { name: 'Complete', id: 1 },
    { name: 'In-Prossing', id: 2 },
  ];
  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder,
    private tasksService: TasksService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.createform();
    this.getAllTasks();
  }

  createform() {
    this.tasksFilter = this.fb.group({
      title: [''],
      userId: [''],
      fromDate: [''],
      toDate: [''],
    });
  }

  getAllTasks() {
    const token = JSON.stringify(localStorage.getItem('token'));
    this.userData = JSON.parse(window.atob(token.split('.')[1]));
    this.tasksService
      .getUserTasks(this.userData.userId, {
        status: this.taskStatus,
      })
      .subscribe(
        (res: any) => {
          this.dataSource = res.tasks;
        },
        () => {
          this.dataSource = [];
        }
      );
  }

  completeTask(ele: any) {
    let model = {
      id: ele._id,
    };
    this.tasksService.completeTask(model).subscribe((res: any) => {
      this.toastr.success(res.massage);
      this.getAllTasks();
    });
  }
}
