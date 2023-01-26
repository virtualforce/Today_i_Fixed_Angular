import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RxjsRoutingModule } from './reactive-form-routing.module';
import { ReactveFormComponent } from './reactive-form.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ReactveFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RxjsRoutingModule
  ]
})
export class ReactiveFormModule { }
