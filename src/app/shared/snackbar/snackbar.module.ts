import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSnackBarModule,MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';





@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    MatSnackBarModule,
    BrowserAnimationsModule
  ],
  providers: [MatSnackBarModule, 
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue:{
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      duration: 4000,
      panelClass:'default-snackbar'
    }}]
})
export class SnackbarModule { }
