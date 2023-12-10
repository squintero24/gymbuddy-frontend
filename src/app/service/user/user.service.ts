import { Injectable } from '@angular/core';
import {SnackbarService} from "../../shared/snackbar/service/snackbar.service";
import {HttpClient} from "@angular/common/http";
import {UserloginDto} from "../../interface/userlogin.dto";
import {UserDto} from "../../interface/user.dto";
import {tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  urlBackUser: String = 'http://localhost:8080/gymbuddy/api/user';

  urlBackPersona: String = 'http://localhost:8080/gymbuddy/api/persona';

  constructor(private http: HttpClient, private snackbar: SnackbarService) {
  }


  login(user: UserloginDto) {
    return this.http.post(this.urlBackUser + '/login', user)
      .pipe(
        tap(
          {
            next: (res) => {
              if (res) {
                this.snackbar.show({
                  mensaje: 'Logeado con exito, bienvenido.',
                  tipo: "success"
                })
              }
            },
            error: (error) => {
              this.snackbar.show({
                mensaje: 'Problema en el login, verifique.',
                tipo: "error"
              })
            }
          }
        )
      )
  }

  getUsers() {
    return this.http.get(this.urlBackPersona + '/all');
  }

}
