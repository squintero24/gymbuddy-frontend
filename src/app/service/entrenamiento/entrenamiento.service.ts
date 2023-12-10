import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SnackbarService} from "../../shared/snackbar/service/snackbar.service";

@Injectable({
  providedIn: 'root'
})
export class EntrenamientoService {

  urlBackEntrenamientos: String = 'http://localhost:8080/gymbuddy/api/entrenamiento';

  constructor(private http: HttpClient, private snackbar: SnackbarService) {
  }

  getEntrenamientos(){
    return this.http.get(this.urlBackEntrenamientos + '/all');
  }
}
