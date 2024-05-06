import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { httpInterceptorsProvider } from './interceptors';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [httpInterceptorsProvider],
})
export class CoreModule {}
