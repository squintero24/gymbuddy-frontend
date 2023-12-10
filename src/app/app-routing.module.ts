import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./public/login/login.component";
import { CambioPsswComponent } from './public/cambio-pssw/cambio-pssw.component';
import {AdminDashboardComponent} from "./admin/admin-dashboard/admin-dashboard.component";

const routes: Routes = [
  {path:'login', component:LoginComponent},
  {path:'', component:AdminDashboardComponent},
  {path:'user/changePsswd', component:CambioPsswComponent},
  {path:'miembro/dashBoard', component:LoginComponent} //cambiar a dashboard de miembros
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
