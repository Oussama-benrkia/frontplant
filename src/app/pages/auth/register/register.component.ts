import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  formLogin!: FormGroup;
  passwordType = 'password';
  confirmPasswordType = 'password';
  imageUrl: string | null = null;
  uploadedFile: File | null = null;
  imageError: string | null = null;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authservice: AuthService
  ) {}

  ngOnInit(): void {
    this.formLogin = this.fb.group(
      {
        nom: ['', [Validators.required]],
        prenom: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required]],
      },
      {
        validators: this.passwordMatchValidator,
      }
    );
  }

  togglePasswordVisibility(): void {
    this.passwordType =
      this.passwordType === 'password' ? 'text' : 'password';
  }

  toggleConfirmPasswordVisibility(): void {
    this.confirmPasswordType =
      this.confirmPasswordType === 'password' ? 'text' : 'password';
  }

  passwordMatchValidator(group: FormGroup): any {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  onImageUpload(event: any): void {
    const file = event.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        this.imageError = 'Veuillez sélectionner un fichier d\'image valide.';
        return;
      }
      this.imageError = null;
      this.uploadedFile = file;
      console.log(this.uploadedFile)
      const reader = new FileReader();
      reader.onload = () => {
        this.imageUrl = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  handleregister(): void {
    if (this.formLogin.invalid) {
      this.formLogin.markAllAsTouched();
      return;
    }
  
    const { nom, prenom, email, password } = this.formLogin.value;
  
    // Create the user object to send to the API
    const user = {
      nom,
      prenom,
      email,
      password,
      file: this.uploadedFile ? this.uploadedFile : null, // Ensure file is either File or null
    };
  
    // Call the register method from AuthService
    this.authservice.register(
      user.prenom, 
      user.nom, 
      user.email, 
      user.password, 
      user.file || null  // Explicitly handle null case
    ).subscribe({
      next: (response) => {
        this.authservice.loadProfile(response.token,response.refreshToken);
        
        if(this.authservice.role==="ADMIN"){
          this.router.navigate(['admin']);
        }else{
          this.router.navigate(['user']);
        }
        },
      error: (error) => {
        console.error('Error during registration:', error);
      },
    });
  }
  

  login(): void {
    this.router.navigate(['auth/login']);
  }
}
