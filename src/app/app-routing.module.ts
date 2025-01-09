import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { HomeComponent } from './pages/user/home/home.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { AuthenticationGuard } from './guards/authentication.guard';
import { LayoutWithNavbarComponent } from './pages/user/layout-with-navbar/layout-with-navbar.component';
import { UsersComponent } from './pages/admin/users/users.component';
import { ArticlesComponent } from './pages/admin/articles/articles.component';
import { DiseasesComponent } from './pages/admin/diseases/diseases.component';

const routes: Routes = [
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  { path: 'auth/login', component: LoginComponent },
  { path: 'auth/register', component: RegisterComponent },
  {
    path: 'user',
    component: LayoutWithNavbarComponent,
    canActivate: [AuthenticationGuard],
    children: [
      { path: '', component: HomeComponent }
    ]
  },
  {
    path: 'admin',
    component: DashboardComponent,
    canActivate: [AuthenticationGuard],
    children: [
      { path: 'users', component: UsersComponent },
      { path: 'articles', component: ArticlesComponent },
      { 
        path: 'plants',
        loadChildren: () => import('./pages/admin/plants/plants.module').then(m => m.PlantsModule)
      },
      { path: 'diseases', component: DiseasesComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
