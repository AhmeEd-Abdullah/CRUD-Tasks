import { Component, OnInit } from '@angular/core';
import { TasksService } from '../../services/tasks.service';
import { MatDialog } from '@angular/material/dialog';
import { AddTaskComponent } from '../add-task/add-task.component';
import { ToastrService } from 'ngx-toastr';
import { formatDate } from '@angular/common';
import { UsersService } from '../../../manage-users/services/users.service';
export interface PeriodicElement {
  title: string;
  user: string;
  deadLineDate: string;
  status: string;
}

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
  dataSource!: any[];
  filterationTypes: any = {};
  startDate_Filteration: any;
  users!: Array<any>;
  status: any = [{ name: 'Complete' }, { name: 'In-Progress' }];

  constructor(
    private dialog: MatDialog,
    private toastr: ToastrService,
    private tasksService: TasksService,
    private userService: UsersService
  ) {
    this.setUsers();
  }

  ngOnInit(): void {
    this.getAllTasks();
    this.getUsers();
  }

  getAllTasks() {
    this.tasksService
      .getAllTasks(this.filterationTypes)
      .subscribe((res: any) => {
        this.dataSource = this.mappingTasks(res.tasks);
      });
  }

  // To modify the returned data that coming from all-tasks response
  mappingTasks(data: any[]) {
    let newTasks = data.map((task) => {
      return {
        ...task,
        user: task.userId?.username,
      };
    });
    return newTasks;
  }

  getUsers() {
    this.userService.getUsersData();
  }

  setUsers() {
    this.userService.usersData.subscribe((res) => {
      this.users = this.mappingToSetUsers(res.data);
    });
  }

  // To modify the returned data that coming from getUsers response
  mappingToSetUsers(data: any) {
    let newArray = data?.map((item: any) => {
      return {
        name: item.username,
        id: item._id,
      };
    });
    return newArray;
  }

  createTask() {
    const dialogRef = this.dialog.open(AddTaskComponent, {
      width: '700px',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result == true) this.getAllTasks();
    });
  }

  updatedTask(element: any) {
    const dialogRef = this.dialog.open(AddTaskComponent, {
      width: '700px',
      data: element,
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result == true) this.getAllTasks();
    });
  }

  deleteTask(id: any) {
    this.tasksService.deleteTask(id).subscribe(() => {
      this.toastr.success('Task Deleted Successfully');
    });
    setTimeout(() => {
      this.getAllTasks();
    }, 500);
  }

  searchOldValue = ''; // To compare it with the current search value, and take an action
  filteration(event: any, type: string) {
    switch (type) {
      case 'keyword':
        let searchNewValue = event.target.value; // To compare it with the old search value
        if (this.searchOldValue !== searchNewValue) {
          this.filterationTypes[type] = searchNewValue;
          this.searchOldValue = searchNewValue;
          this.getAllTasks();
        }
        break;
      case 'userId':
        this.filterationTypes[type] = event.value;
        this.getAllTasks();
        break;
      case 'status':
        this.filterationTypes[type] = event.value;
        this.getAllTasks();
        break;
      case 'toDate':
        this.filterationTypes['fromDate'] = formatDate(
          this.startDate_Filteration,
          'dd/MM/YYYY',
          'en-US'
        );
        this.filterationTypes[type] = formatDate(
          event.value,
          'dd/MM/YYYY',
          'en-US'
        );
        if (this.filterationTypes[type] !== '01/01/1970') this.getAllTasks();
        break;
    }
  }
}
