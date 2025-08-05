import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services';

@Component({
  selector: 'app-register',
  imports: [FormsModule, RouterLink, ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  private authService = inject(AuthService);
  private router = inject(Router);
  private formBuilder = inject(FormBuilder);

  registerForm: FormGroup;

  constructor() {
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.pattern(/^(?=.{6,})[a-zA-Z][a-zA-Z0-9._-]*@gmail\.(com|bg)$/)]],
      phone: ['', [Validators.pattern(/^\d{9}$/)]],
      passwords: this.formBuilder.group({
        password: ['', [Validators.required, Validators.minLength(5), Validators.pattern(/^[a-zA-Z0-9]+$/)]],
        rePassword: ['', [Validators.required]],
      }, { validators: this.passwordMatchValidator }) // ✅ Apply validator to the group
    });
  }

  get username(): AbstractControl<any, any> | null {
    return this.registerForm.get('username');
  }

  get email(): AbstractControl<any, any> | null {
    return this.registerForm.get('email');
  }

  get phone(): AbstractControl<any, any> | null {
    return this.registerForm.get('phone');
  }

  get passwords(): FormGroup {
    return this.registerForm.get('passwords') as FormGroup;
  }

  get password(): AbstractControl<any, any> | null {
    return this.passwords.get('password');
  }
  
  get rePassword(): AbstractControl<any, any> | null {
    return this.passwords.get('rePassword');
  }

  get isUsernmeValid(): boolean {
    return this.username?.invalid && (this.username?.touched || this.username?.dirty) || false;
  }

  get isEmailValid(): boolean {
    return this.email?.invalid && (this.email?.touched || this.email?.dirty) || false;
  }

  get isPhoneValid(): boolean {
    return this.phone?.invalid && (this.phone?.touched || this.phone?.dirty) || false;
  }

  get isPasswordsValid(): boolean {
    return this.passwords?.invalid && (this.passwords?.touched || this.passwords?.dirty) || false;
  }

  get isRePasswordValid(): boolean {
    return this.rePassword?.invalid && (this.rePassword?.touched || this.rePassword?.dirty) || false;
  }

  get usernameErrorMessage(): string {
    if(this.username?.errors?.['required']) {
      return 'Username is required!';
    } else if(this.username?.errors?.['minlength']) {
      return 'Username must be at least 5 characters!';
    } else {
      return '';
    }
  }

  get phoneErrorMessage(): string {
    if(this.phone?.errors?.['pattern']) {
      return 'Phone must be 9 digits!';
    } else {
      return '';
    }
  }

  get emailErrorMessage(): string {
    if(this.email?.errors?.['required']) {
      return 'Email is required!';
    } else if(this.email?.errors?.['pattern']) {
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
    } else if(this.password?.errors?.['pattern']) {
      return 'Password is not valid!';
    } else {
      return '';
    }
  }

  get rePpasswordErrorMessage(): string {
    if(this.rePassword?.errors?.['required']) {
      return 'Confirm password is required!';
    } else if(this.passwords?.errors?.['passwordMismatch']) {  // ✅ Check group-level error
      return 'Passwords do not match!';
    } else {
      return '';
    }
  }

  // ✅ Fixed validator - now receives the FormGroup
  private passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const rePassword = control.get('rePassword');
    
    if (password && rePassword && password.value !== rePassword.value) {
      return { passwordMismatch: true };
    }
    return null;
  }

  onSubmit(): void {
    if(this.registerForm.valid) {
      const { username, email, phone } = this.registerForm.value;
      const { password, rePassword } = this.registerForm.value.passwords;
      
      console.log(username);

      this.authService.register(username, email, phone, password, rePassword).subscribe({
        next: () => {
          this.router.navigate(['/home']);
        },
        error: (err) => {
          console.log('Registration failed', err);
          this.markFormGroupTouched();
        }
      });
    }
  }
  
  private markFormGroupTouched(): void {
    Object.keys(this.registerForm.controls).forEach(field => {
      const control = this.registerForm.get(field);
      if (control instanceof FormGroup) {
        Object.keys(control.controls).forEach(key => {
          const subControl = control.get(key);
          if (subControl) {
            subControl.markAsTouched();
          }
        });
      } else if(control) {
        control?.markAsTouched();
      }
    });
  }
}