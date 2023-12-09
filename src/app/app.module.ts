import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDialogRef} from "@angular/material/dialog";
import {ConfirmService} from "./shared/confirm/service/confirm.service";
import {SnackbarService} from "./shared/snackbar/service/snackbar.service";
import { LoginComponent } from './public/login/login.component';
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatSelectModule} from "@angular/material/select";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {SnackbarModule} from "./shared/snackbar/snackbar.module";
import {ConfirmModule} from "./shared/confirm/confirm.module";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatIconModule,
    MatSelectModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    SnackbarModule,
    ConfirmModule
  ],
  providers: [
    SnackbarService,
    ConfirmService,
    {
      provide:MatDialogRef,
      useValue:{}
    },

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
