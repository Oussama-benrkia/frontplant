import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { HomeComponent } from './pages/user/home/home.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { authenticationGuard } from './guards/authentication.guard';
import { LayoutWithNavbarComponent } from './pages/user/layout-with-navbar/layout-with-navbar.component';
import { PlantListComponent } from './pages/user/plant/plant-list/plant-list.component';
import { PlantDetailComponent } from './pages/user/plant/plant-detail/plant-detail.component';
import { PlantSearchComponent } from './pages/user/plant/plant-search/plant-search.component';
import { ArticleListComponent } from './pages/user/article/article-list/article-list.component';
import { ArticleDetailComponent } from './pages/user/article/article-detail/article-detail.component';

const routes: Routes = [
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  { path: 'auth/login', component: LoginComponent },
  { path: 'auth/register', component: RegisterComponent },
  {
    path: 'user',
    component: LayoutWithNavbarComponent,
    canActivate: [authenticationGuard],
    children: [
      { path: '', component: HomeComponent },
      { path: 'plants', component: PlantListComponent },
      { path: 'plants/:id', component: PlantDetailComponent },
      { path: 'plants/search', component: PlantSearchComponent },
      { path: 'articles', component: ArticleListComponent },
      { path: 'articles/:id', component: ArticleDetailComponent }
    ]
  },
  {path:'admin',component:DashboardComponent,canActivate:[authenticationGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
