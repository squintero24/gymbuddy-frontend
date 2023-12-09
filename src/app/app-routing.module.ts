import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./public/login/login.component";
import {DashboardComponent} from "./admin/dashboard/dashboard.component";

const routes: Routes = [
  {path:'login', component:LoginComponent},
  {path:'admin/dashboard', component:DashboardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
