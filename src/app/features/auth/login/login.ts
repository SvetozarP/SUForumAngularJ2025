import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [RouterLink, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  private authService = inject(AuthService);
  private router = inject(Router);

  email: string = '';
  password: string = '';
  emailError: boolean = false;
  passwordError: boolean = false;
  emailErrorMessage: string = '';
  passwordErrorMessage: string = '';

  validateEmail(): void {
    if(!this.email) {
      this.emailError = true;
      this.emailErrorMessage = 'Email is required!';
    } else if(!this.isValidEmail(this.email)) {
      this.emailError = true;
      this.emailErrorMessage = 'Email is not valid';
    } else {
      this.emailError = false;
      this.emailErrorMessage = '';
    }
  }

  validatePassword(): void {
    if(!this.password) {
      this.passwordError = true;
      this.passwordErrorMessage = 'Password is required!';
    } else if (this.password.length < 4) {
      this.passwordError = true;
      this.passwordErrorMessage = 'Password must be at least 4 characters!';
    } else {
      this.passwordError = false;
      this.passwordErrorMessage = '';
    }
  }

  isFormValid(): boolean {
    return !this.emailError && !this.passwordError && Boolean(this.email) && Boolean(this.password);
  }

  onSubmit(): void {
    this.validateEmail();
    this.validatePassword();
    if(this.isFormValid()) {
      const response = this.authService.login(this.email, this.password);
      if(response === true) {
        this.router.navigate(['/home']);
      } else {
        this.emailError = true;
        this.passwordError = true;
        this.emailErrorMessage = 'Invalid email or password!';
        this.passwordErrorMessage = 'Invalid email or password!';
      }
    }
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

}
