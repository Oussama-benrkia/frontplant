import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AuthService } from './services/auth.service';

// Material Modules
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatMenuModule } from '@angular/material/menu';

// Components
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ArticlesModule } from './pages/admin/articles/articles.module';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { HomeComponent } from './pages/user/home/home.component';
import { LayoutWithNavbarComponent } from './pages/user/layout-with-navbar/layout-with-navbar.component';
import { NavbarComponent } from './pages/user/navbar/navbar.component';
import { UsersComponent } from './pages/admin/users/users.component';
import { UserDialogComponent } from './pages/admin/users/user-dialog/user-dialog.component';
import { DiseasesComponent } from './pages/admin/diseases/diseases.component';
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
import { ProfileComponent } from './pages/user/profile/profile.component';
import { ArticleSearchComponent } from './pages/user/article/article-search/article-search.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    HomeComponent,
    LayoutWithNavbarComponent,
    NavbarComponent,
    UsersComponent,
    UserDialogComponent,
    DiseasesComponent,
    PlantListComponent,
    PlantDetailComponent,
    PlantSearchComponent,
    PlantCardComponent,
    ArticleListComponent,
    ArticleDetailComponent,
    ArticleCardComponent,
    ProfileComponent,
    ArticleSearchComponent
     // Add ArticleSearchComponent to declarations
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    AppRoutingModule,
    ArticlesModule,
    // Material Modules
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatSelectModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    MatMenuModule
  ],
  providers: [
    provideHttpClient(
      withInterceptors([appHttpInterceptor])
    ),
    AuthService,
    ArticleService,
    RouterModule,
    MaladiesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
