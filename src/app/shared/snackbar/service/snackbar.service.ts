import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import { SnackbarModel } from '../snackbar.model';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  

  constructor(private _snackbar: MatSnackBar) { }

  show(snackbar:SnackbarModel){
      if(snackbar.tipo === 'success'){ 
        this._snackbar.open(snackbar.mensaje, 'Cerrar',{panelClass:['success-snackbar']});
      }else if(snackbar.tipo === 'error'){
        this._snackbar.open(snackbar.mensaje, 'Cerrar',{panelClass:['error-snackbar']});
      }else { 
        this._snackbar.open(snackbar.mensaje, 'Cerrar',{panelClass:['default-snackbar']});
      }  
  }

  showError(resp: HttpErrorResponse){
      this._snackbar.open(resp.message,'Cerrar', {panelClass:['error-snackbar']});
    }
 
}
