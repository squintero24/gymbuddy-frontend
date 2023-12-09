import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmComponent } from './confirm.component';
import {MatDialogModule} from '@angular/material/dialog'; 
import {MatButtonModule} from '@angular/material/button'; 
import { ConfirmService } from './service/confirm.service';

@NgModule({
  declarations: [
    ConfirmComponent,
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule
  ],
  exports: [
    ConfirmComponent
  ],
  providers: [
    ConfirmService
  ]
})
export class ConfirmModule { }
