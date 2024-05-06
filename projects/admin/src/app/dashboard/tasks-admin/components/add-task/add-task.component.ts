import { formatDate } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { TasksService } from '../../services/tasks.service';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationPopupComponent } from '../confirmation-popup/confirmation-popup.component';
import { UsersService } from '../../../manage-users/services/users.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss'],
})
export class AddTaskComponent implements OnInit {
  newTaskForm!: FormGroup;
  imageName!: string;
  formValues: any;
  constructor(
    private fb: FormBuilder,
    public dialog: MatDialogRef<AddTaskComponent>,
    public matDialog: MatDialog,
    private taskService: TasksService,
    private userService: UsersService,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  users!: Array<any>;
  ngOnInit(): void {
    this.createTaskForm();
    this.setUsers();
  }

  createTaskForm() {
    this.newTaskForm = this.fb.group({
      title: [
        this.data?.title || '',
        [Validators.required, Validators.minLength(5)],
      ],
      userId: [this.data?.userId._id || '', Validators.required],
      image: [this.data?.image || '', Validators.required],
      description: [this.data?.description || '', Validators.required],
      deadline: [
        this.data
          ? new Date(
              this.data?.deadline.split('/').reverse().join('/')
            ).toISOString()
          : '',
        Validators.required,
      ],
    });
    this.formValues = this.newTaskForm.value;
  }

  setUsers() {
    this.userService.usersData.subscribe((res) => {
      this.users = this.mappingToSetUsers(res.data);
    });
  }

  // To modify the returned data that coming from getUsers response
  mappingToSetUsers(data: any) {
    let newArray = data.map((item: any) => {
      return {
        name: item.username,
        id: item._id,
      };
    });
    return newArray;
  }

  setImage(event: any) {
    this.imageName = event.target.files[0]['name'];
    this.newTaskForm.get('image')?.setValue(event.target.files[0]);
  }

  prepareFormData() {
    let formData = new FormData();
    Object.entries(this.newTaskForm.value).forEach(
      ([key, value]: Array<any>) => {
        if (key == 'deadline') {
          value = formatDate(value, 'dd/MM/YYYY', 'en-US');
        }
        formData.append(key, value);
      }
    );
    return formData;
  }

  createTask() {
    const model = this.prepareFormData();
    this.taskService.addTask(model).subscribe(() => {
      this.dialog.close(true);
      this.toastr.success('Task Created Successfully', 'Success');
    });
  }

  updateTask() {
    const model = this.prepareFormData();
    this.taskService.updateTask(this.data._id, model).subscribe(() => {
      this.dialog.close(true);
      this.toastr.success('Task Updated Successfully', 'Success');
    });
  }

  cofirmClosing() {
    if (
      JSON.stringify(this.formValues) !== JSON.stringify(this.newTaskForm.value)
    ) {
      const dialogRef = this.matDialog.open(ConfirmationPopupComponent, {
        width: '500px',
      });
    } else this.dialog.close();
  }
}
