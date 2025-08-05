import { Component, inject } from '@angular/core';
import { AuthService } from '../../core/services';
import { RouterLink } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../models';

@Component({
  selector: 'app-profile',
  imports: [ReactiveFormsModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class Profile {
  private authService = inject(AuthService);
  private formBuilder = inject(FormBuilder);
  readonly currentUser = this.authService.currentUser;

  isEditMode: boolean = false;
  profileForm: FormGroup;

  constructor() {
    this.profileForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.pattern(/^(?=.{6,})[a-zA-Z][a-zA-Z0-9._-]*@gmail\.(com|bg)$/)]],
      phone: [''],
    });
  }

  get username(): AbstractControl<any, any> | null {
    return this.profileForm.get('username');
  }

  get email(): AbstractControl<any, any> | null {
    return this.profileForm.get('email');
  }

  get phone(): AbstractControl<any, any> | null {
    return this.profileForm.get('phone');
  }

  get isUsernmeValid(): boolean {
    return this.username?.invalid && (this.username?.touched || this.username?.dirty) || false;
  }

  get isEmailValid(): boolean {
    return this.email?.invalid && (this.email?.touched || this.email?.dirty) || false;
  }

  // get isPhoneValid(): boolean {
  //   return this.phone?.invalid && (this.phone?.touched || this.phone?.dirty) || false;
  // }

  get usernameErrorMessage(): string {
    if(this.username?.errors?.['required']) {
      return 'Username is required!';
    } else if(this.username?.errors?.['minlength']) {
      return 'Username must be at least 5 characters!';
    } else {
      return '';
    }
  }

  // get phoneErrorMessage(): string {
  //   if(this.phone?.errors?.['pattern']) {
  //     return 'Phone must be 9 digits!';
  //   } else {
  //     return '';
  //   }
  // }

  get emailErrorMessage(): string {
    if(this.email?.errors?.['required']) {
      return 'Email is required!';
    } else if(this.email?.errors?.['pattern']) {
      return 'Email is not valid';
    } else {
      return '';
    }
  }

  onEdit(): void {
    const user = this.currentUser();
    this.profileForm.patchValue({
      username: user?.username,
      email: user?.email,
      phone: user?.phone,
    });
    this.isEditMode = true;
  }

  onCancel(): void {
    this.isEditMode = false;
    this.profileForm.reset();
  }

  onSave(): void {
    if(this.profileForm.valid) {
      const { username, email, phone } = this.profileForm.value;

      const updatedUser = <User> {
        ...this.currentUser(),
        username,
        email,
        phone,
      }

      this.authService.updateUser(updatedUser).subscribe({
        next: () => {
          this.isEditMode = false;
          this.profileForm.reset();
        },
        error: (err) => {
          console.log('Update failed', err);
        }
      });
    }
  }
}
