import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  fromLogin!:FormGroup;


  constructor(
    private router: Router,
    private fb:FormBuilder,
    private authservice:AuthService
  ) {
  }
  ngOnInit(): void {
    this.fromLogin = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  Handlelogin(){
    if (this.fromLogin.valid) {
      let email:String=this.fromLogin.value.email;
      let password :String=this.fromLogin.value.password;
      console.log("hh");
      /*this.authservice.login(this.email,this.password).subscribe({
        next:value=>{
          console.log(value)
        },
        error:err=>{
          console.log(err)
        }
      })*/
    }else {
      this.fromLogin.markAllAsTouched(); // Mark all fields as touched to show validation errors
    }
  }
  register() {
    return this.router.navigate(['auth/register']);
  }
}
