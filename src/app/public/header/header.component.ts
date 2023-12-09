import { Component } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {UserInfoComponent} from "./user-info/user-info.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(private dialog: MatDialog, private router: Router) { }

  get isLogged(): boolean {
    return !!localStorage.getItem('userData');

  }

  logOut(){
    localStorage.removeItem('userData');
    localStorage.removeItem('roles');
    this.router.navigate(['/login']);
  }

  logIn(){
    this.router.navigate(['/login']);
  }

  openUserInfoModal(): void {
    const userInfo = JSON.parse(localStorage.getItem('userData') || '{}');
    this.dialog.open(UserInfoComponent, {
      width: '400px',
      data: userInfo
    });
  }

}
