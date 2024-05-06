import { ToastrService } from 'ngx-toastr';
import { UsersService, userStatus } from './../../services/users.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = [
    'position',
    'name',
    'email',
    'tasksAssigned',
    'actions',
  ];
  dataSource: any;
  searchByName: string = '';
  constructor(
    private usersService: UsersService,
    private toastr: ToastrService
  ) {
    this.setUsersData();
  }

  ngOnInit(): void {
    this.getUsersData();
  }

  getUsersData() {
    const model = {
      name: this.searchByName,
    };
    this.usersService.getUsersData(model);
  }

  setUsersData() {
    this.usersService.usersData.subscribe((res) => {
      this.dataSource = res.data;
    });
  }

  searchOldValue = ''; // To compare it with the current search value, and take an action
  search(event: any) {
    this.searchByName = event.target.value;
    if (this.searchOldValue !== this.searchByName) {
      this.getUsersData();
      this.searchOldValue = this.searchByName;
    }
  }

  deleteUser(ele: any) {
    if (ele.assignedTasks > 0) {
      this.toastr.error('This user has incomplete tasks');
    } else {
      this.usersService.deleteUser(ele._id).subscribe((res: any) => {
        this.toastr.success(res.massage);
        this.getUsersData();
      });
    }
  }

  changeStatus(ele: any) {
    if (ele.assignedTasks > 0) {
      this.toastr.error('This user has incomplete tasks');
    } else {
      const body: userStatus = {
        id: ele._id,
        status: ele.status,
      };
      this.usersService.changeStatus(body).subscribe((res: any) => {
        this.toastr.success(res.massage);
        this.getUsersData();
      });
    }
  }
}
