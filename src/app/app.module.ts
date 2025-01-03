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
import {  HTTP_INTERCEPTORS, HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { HomeComponent } from './pages/user/home/home.component';
import { LayoutWithNavbarComponent } from './pages/user/layout-with-navbar/layout-with-navbar.component';
import { NavbarComponent } from './pages/user/navbar/navbar.component';
import { appHttpInterceptor } from './interceptor/app-http.interceptor';
import { PlantListComponent } from './pages/user/plant/plant-list/plant-list.component';
import { PlantDetailComponent } from './pages/user/plant/plant-detail/plant-detail.component';
import { PlantSearchComponent } from './pages/user/plant/plant-search/plant-search.component';
import { PlantCardComponent } from './pages/user/plant/components/plant-card/plant-card.component';
import { ArticleService } from './services/article.service';
import { MaladiesService } from './services/maladies.service';
import { ArticleListComponent } from './pages/user/article/article-list/article-list.component';
import { ArticleDetailComponent } from './pages/user/article/article-detail/article-detail.component';
import { ArticleCardComponent } from './pages/user/article/components/article-card/article-card.component';
import { ArticleSearchComponent } from './pages/user/article/article-search/article-search.component'; // Import ArticleSearchComponent

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    HomeComponent,
    LayoutWithNavbarComponent,
    NavbarComponent,
    PlantListComponent,
    PlantDetailComponent,
    PlantSearchComponent,
    PlantCardComponent,
    ArticleListComponent,
    ArticleDetailComponent,
    ArticleCardComponent,
    ArticleSearchComponent // Add ArticleSearchComponent to declarations
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    provideHttpClient(
      withInterceptors([appHttpInterceptor])
    ),
    AuthService,
    ArticleService,
    MaladiesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
