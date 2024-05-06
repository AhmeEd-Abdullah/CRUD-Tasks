import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TasksAdminRoutingModule } from './tasks-admin-routing.module';
import { ListTasksComponent } from './components/list-tasks/list-tasks.component';
import { AddTaskComponent } from './components/add-task/add-task.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '../../material/material.module';
import { ConfirmationPopupComponent } from './components/confirmation-popup/confirmation-popup.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    ListTasksComponent,
    AddTaskComponent,
    ConfirmationPopupComponent,
  ],
  imports: [
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    TasksAdminRoutingModule,
    SharedModule,
  ],
})
export class TasksAdminModule {}
