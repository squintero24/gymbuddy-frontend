import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {UserDto} from "../../../interface/user.dto";

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent {

  get roles(){
    return this.data.roles.map(rol => rol.nombreRol);
  }

  constructor(@Inject(MAT_DIALOG_DATA) public data: UserDto) { }

}
