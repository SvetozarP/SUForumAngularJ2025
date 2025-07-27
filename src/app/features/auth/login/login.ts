import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  private authService = inject(AuthService);
  private router = inject(Router);
  private formBuilder = inject(FormBuilder);

  loginForm: FormGroup;

  constructor() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, emailValidator]],
      // can use Validators.pattern(/^(?=.{6,})[a-zA-Z][a-zA-Z0-9._-]*@gmail\.(com|bg)$/)
      // and then look for this.email?.errors?.['pattern']
      password: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }

  get emailErrorMessage(): string {
    if(this.email?.errors?.['required']) {
      return 'Email is required!';
    } else if(this.email?.errors?.['emailValidator']) {
      return 'Email is not valid';
    } else {
      return '';
    }
  }

  get passwordErrorMessage(): string {
    if(this.password?.errors?.['required']) {
      return 'Password is required!';
    } else if(this.password?.errors?.['minlength']) {
      return 'Password must be at least 5 characters!';
    } else {
      return '';
    }
  }

  get emailError(): boolean {
    return this.email?.invalid && (this.email?.touched || this.email?.dirty) || false;
  }

  get passwordError(): boolean {
    return this.password?.invalid && (this.password?.touched || this.password?.dirty) || false;
  }

  onSubmit(): void {

    if(this.loginForm.valid) {
      const {email, password} = this.loginForm.value;
      const response = this.authService.login(email, password);
      if(response === true) {
        this.router.navigate(['/home']);
      } else {
        this.markFormGroupTouched();
      }
    }
  }
  
  private markFormGroupTouched(): void {
    Object.keys(this.loginForm.controls).forEach(field => {
      const control = this.loginForm.get(field);
      if(control) {
        control?.markAsTouched();
      }
    });
  }



  private isValidEmail(email: string): boolean {
    // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const emailRegex = /^(?=.{6,})[a-zA-Z][a-zA_Z0-9._-]*@gmail\.(com|bg)$/;
    return emailRegex.test(email);
  }

}

export function emailValidator(emailControl: AbstractControl): ValidationErrors | null {
  const emailRegex = /^(?=.{6,})[a-zA-Z][a-zA-Z0-9._-]*@gmail\.(com|bg)$/;
  const email = emailControl.value;

  if (email && !emailRegex.test(email)) {
    return { emailValidator: true} 
  }
  return null;

}