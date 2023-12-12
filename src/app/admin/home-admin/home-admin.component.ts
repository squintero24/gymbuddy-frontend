import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserDto } from 'src/app/interface/user.dto';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.scss']
})
export class HomeAdminComponent {

  constructor(private router: Router){}

  get userInfo(): UserDto {
    const userSaved = localStorage.getItem('userData');
    return JSON.parse(userSaved || '{}');
  }

  iniciar(){
    this.router.navigate(['']);
  }
}
