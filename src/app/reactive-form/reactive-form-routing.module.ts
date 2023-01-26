import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReactveFormComponent } from './reactive-form.component';

const routes: Routes = [ {
  path: 'home',
  component: ReactveFormComponent
},
{ path: '', redirectTo: 'home', pathMatch: 'full'  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RxjsRoutingModule { }
