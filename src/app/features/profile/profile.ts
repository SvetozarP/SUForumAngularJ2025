import { Component, inject } from '@angular/core';
import { AuthService } from '../../core/services';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class Profile {
  private authService = inject(AuthService);
  readonly currentUser = this.authService.currentUser;
  
  onEdit(): void {
    alert('This will be implemented later!');
  }
}
