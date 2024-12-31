import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { HomeComponent } from './pages/user/home/home.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { authenticationGuard } from './guards/authentication.guard';
import { LayoutWithNavbarComponent } from './pages/user/layout-with-navbar/layout-with-navbar.component';

const routes: Routes = [
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  { path: 'auth/login', component: LoginComponent },
  { path: 'auth/register', component: RegisterComponent },
  {
    path: 'user',
    component: LayoutWithNavbarComponent,
    canActivate: [authenticationGuard], // Ajout de la garde au niveau du parent
    children: [
      { path: '', component: HomeComponent } // Route par défaut pour /user
    ]
  },
  {path:'admin',component:DashboardComponent,canActivate:[authenticationGuard]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
