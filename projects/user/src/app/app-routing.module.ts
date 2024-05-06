import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TasksGuard } from './core/guards/tasks.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import(`./auth/auth.module`).then((m) => m.AuthModule),
  },
  {
    path: 'tasks',
    loadChildren: () =>
      import(`./tasks/tasks.module`).then((m) => m.TasksModule),
    canLoad: [TasksGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
