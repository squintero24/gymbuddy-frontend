import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SnackbarService} from "../../shared/snackbar/service/snackbar.service";
import {tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EntrenamientoService {

  urlBackEntrenamientos: String = 'http://localhost:8080/gymbuddy/api/entrenamiento';

  constructor(private http: HttpClient, private snackbar: SnackbarService) {
  }

  crearEntrenamiento(entrenamiento:any){
    return this.http.post(this.urlBackEntrenamientos+'/create',entrenamiento)
      .pipe(
        tap(
          {
            next: (res) => {
              if (res) {
                this.snackbar.show({
                  mensaje: 'Se creo el entrenamiento con exito.',
                  tipo: "success"
                })
              }
            },
            error: (error) => {
              this.snackbar.show({
                mensaje: 'Problema creando el entrenamiento.',
                tipo: "error"
              })
            }
          }
        )
      )
  }

  actualizarEntrenamiento(entrenamiento:any){
    return this.http.put(this.urlBackEntrenamientos+'/update',entrenamiento)
      .pipe(
        tap(
          {
            next: (res) => {
              if (res) {
                this.snackbar.show({
                  mensaje: 'Se actualizo el entrenamiento con exito.',
                  tipo: "success"
                })
              }
            },
            error: (error) => {
              this.snackbar.show({
                mensaje: 'Problema actualizando el entrenamiento.',
                tipo: "error"
              })
            }
          }
        )
      )
  }

  deleteEntrenamiento(id:number){
    return this.http.delete(this.urlBackEntrenamientos + `/delete/${id}`);
  }

  getEntrenamientos(){
    return this.http.get(this.urlBackEntrenamientos + '/all');
  }
}
