import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserDto } from 'src/app/interface/user.dto';

@Component({
  selector: 'app-home-miembro',
  templateUrl: './home-miembro.component.html',
  styleUrls: ['./home-miembro.component.scss']
})
export class HomeMiembroComponent {
  constructor(private router: Router){}

  get userInfo(): UserDto {
    const userSaved = localStorage.getItem('userData');
    return JSON.parse(userSaved || '{}');
  }

  iniciar(){
    this.router.navigate(['miembro/dashBoard']);
  }
}
