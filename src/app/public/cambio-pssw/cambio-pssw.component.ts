import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RolesDto } from 'src/app/interface/roles.dto';
import { UserDto } from 'src/app/interface/user.dto';
import { UserloginDto } from 'src/app/interface/userlogin.dto';
import { UserService } from 'src/app/service/user/user.service';

@Component({
  selector: 'app-cambio-pssw',
  templateUrl: './cambio-pssw.component.html',
  styleUrls: ['./cambio-pssw.component.scss']
})
export class CambioPsswComponent implements OnInit{
  form: FormGroup;
 

  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router) {
    this.form = this.formBuilder.group({
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    }, { validators: this.passwordMatchValidator });
  }

  ngOnInit() {
  }

  passwordMatchValidator(form: FormGroup) {
    const newPassword = form.get('newPassword')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return newPassword === confirmPassword ? null : { passwordMismatch: true };
  }
  get userInfo(): UserDto {
    const userSaved = localStorage.getItem('userData');
    return JSON.parse(userSaved || '{}');
  }



  changePassword() {
    // Asigno el nuevo valor de contraseña a los datos de usuario que recupere del localstorage con userInfo
    let userNewPass: UserloginDto = {
      username: this.userInfo.username,
      passwd:this.form.get('newPassword')?.value};
    if (this.form.valid) {    
      this.userService.changePsswd(userNewPass)
      .subscribe((res:any)=>{
        if(res){
          const roles = res.roles?.map((rol:RolesDto) => rol.nombreRol)
          localStorage.setItem('userData', JSON.stringify(res));
          localStorage.setItem('roles', roles);
          if(this.userInfo.roles[0].nombreRol === 'Miembro'){
            this.router.navigate(['Miembro/Home'])
          }
          else if(this.userInfo.roles[0].nombreRol === 'Admin'){
            this.router.navigate(['Admin/Home'])
          }
        }
      })

    }
  }
}
