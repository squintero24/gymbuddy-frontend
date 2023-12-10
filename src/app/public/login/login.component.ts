import {Component, OnInit} from '@angular/core';
import {FormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {UserService} from "../../service/user/user.service";
import {RolesDto} from "../../interface/roles.dto";
import {UserDto} from "../../interface/user.dto";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  form: UntypedFormGroup;

  get userInfo(): UserDto {
    const userSaved = localStorage.getItem('userData');
    return JSON.parse(userSaved || '{}');
  }

  get isLogged(): boolean {
    return !!localStorage.getItem('userData');

  }

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {
  }

  ngOnInit() {
    this.buildForm();
  }

  buildForm(){
    this.form = this.fb.group({
      username: ['', Validators.required],
      passwd: ['', Validators.required],
    });}

  login(){
    if(this.form.valid){
      this.userService.login(this.form.value)
        .subscribe((res:any)=>{
          if(res){
            const roles = res.roles?.map((rol:RolesDto) => rol.nombreRol)
            localStorage.setItem('userData', JSON.stringify(res));
            localStorage.setItem('roles', roles);
            if(this.userInfo.userValido != 1){
               this.router.navigate(['user/changePsswd'])
            }
            else{
              if(this.userInfo.roles[0].nombreRol === 'Miemrbo'){
                this.router.navigate(['miembro/dashBoard'])
              }
              else if(this.userInfo.roles[0].nombreRol === 'Admin'){
                this.router.navigate([''])
              }
            }
           
          }
        })
    }
  }

}
