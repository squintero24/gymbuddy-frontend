import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDialogModule, MatDialogRef} from "@angular/material/dialog";
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
import { HeaderComponent } from './public/header/header.component';
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatToolbarModule} from "@angular/material/toolbar";
import { UserInfoComponent } from './public/header/user-info/user-info.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    UserInfoComponent,
    DashboardComponent
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
    ConfirmModule,
    MatToolbarModule,
    MatDialogModule,
    FlexLayoutModule
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
