import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './services/auth.service';
import {  HttpClientModule, provideHttpClient } from '@angular/common/http';
import { HomeComponent } from './pages/user/home/home.component';
import { LayoutWithNavbarComponent } from './pages/user/layout-with-navbar/layout-with-navbar.component';
import { NavbarComponent } from './pages/user/navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    HomeComponent,
    LayoutWithNavbarComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    provideHttpClient(),
    AuthService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
