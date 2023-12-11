import { Injectable } from '@angular/core';
import { SnackbarService } from "../../shared/snackbar/service/snackbar.service";
import { HttpClient } from "@angular/common/http";
import { UserloginDto } from "../../interface/userlogin.dto";
import { UserDto } from "../../interface/user.dto";
import { tap } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  urlBackUser: String = 'http://localhost:8080/gymbuddy/api/user';

  urlBackPersona: String = 'http://localhost:8080/gymbuddy/api/persona';

  urlBackPlanes: String = 'http://localhost:8080/gymbuddy/api/planes';

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

  crearPersona(persona: any) {
    return this.http.post(this.urlBackPersona + '/create', persona).pipe(
      tap(
        {
          next: (res) => {
            if (res) {
              this.snackbar.show({
                mensaje: 'Se ha creado correctamente el nuevo usuario.',
                tipo: "success"
              })
            }
          },
          error: (error) => {
            this.snackbar.show({
              mensaje: 'Problemas creando usuario, por favor verifique.',
              tipo: "error"
            })
          }
        }
      )
    )
  }

  actualizarPersona(persona:any){
    return this.http.put(this.urlBackPersona + '/update', persona).pipe(
      tap(
        {
          next: (res) => {
            if (res) {
              this.snackbar.show({
                mensaje: 'Se ha actualizado correctamente el usuario.',
                tipo: "success"
              })
            }
          },
          error: (error) => {
            this.snackbar.show({
              mensaje: 'Problemas actualizando usuario, por favor verifique.',
              tipo: "error"
            })
          }
        }
      )
    )
  }


  deletePersona(id: number) {
    return this.http.delete(this.urlBackPersona + `/delete/${id}`);
  }

  getUsers() {
    return this.http.get(this.urlBackPersona + '/all');
  }

  getDocuments() {
    return this.http.get(this.urlBackPersona + '/documento/all');
  }

  getRoles() {
    return this.http.get(this.urlBackUser + '/roles/all');
  }

  getPlans() {
    return this.http.get(this.urlBackPlanes + '/all');
  }


  changePsswd(user: UserloginDto) {
    return this.http.put(this.urlBackUser + '/update', user)
      .pipe(
        tap(
          {
            next: (res) => {
              if (res) {
                this.snackbar.show({
                  mensaje: 'Contraseña actualizada con exito, bienvenido.',
                  tipo: "success"
                })
              }
            },
            error: (error) => {
              this.snackbar.show({
                mensaje: 'Problema en la actualización, verifique.',
                tipo: "error"
              })
            }
          }
        )
      )
  }



}
