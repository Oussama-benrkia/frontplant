import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  formLogin!: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authservice: AuthService
  ) { }

  ngOnInit(): void {
    this.formLogin = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

   handleLogin(): void {
    if (this.formLogin.valid) {
      const email: string = this.formLogin.value.email;
      const password: string = this.formLogin.value.password;
      console.log("Logging in...");

      this.authservice.login(email, password).subscribe({
        next: (response) => {
          this.authservice.loadProfile(response.token,response.refreshToken);
          
          if(this.authservice.role==="Admin"){
            this.router.navigate(['admin']);
          }else{
            this.router.navigate(['user']);

          }
          },
        error: (err) => {
          this.formLogin.markAllAsTouched(); // Mark all fields as touched to show validation errors
        }
      });
    } else {
      this.formLogin.markAllAsTouched(); // Mark all fields as touched to show validation errors
    }
  }

  register(): void {
    this.router.navigate(['auth/register']);
  }
}