import { Component } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {UserInfoComponent} from "./user-info/user-info.component";
import {Router} from "@angular/router";
import { UserDto } from 'src/app/interface/user.dto';

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

  get userInfo(): UserDto {
    const userSaved = localStorage.getItem('userData');
    return JSON.parse(userSaved || '{}');
  }

  logOut(){
    localStorage.removeItem('userData');
    localStorage.removeItem('roles');
    this.router.navigate(['/login']);
  }

  logIn(){
    this.router.navigate(['/login']);
  }

  home(){
    if(this.userInfo.roles[0].nombreRol === 'Miembro'){
      this.router.navigate(['Miembro/Home'])
    }
    else if(this.userInfo.roles[0].nombreRol === 'Admin'){
      this.router.navigate(['Admin/Home'])
  }
  }

  openUserInfoModal(): void {
    const userInfo = JSON.parse(localStorage.getItem('userData') || '{}');
    this.dialog.open(UserInfoComponent, {
      width: '400px',
      data: userInfo
    });
  }

}
