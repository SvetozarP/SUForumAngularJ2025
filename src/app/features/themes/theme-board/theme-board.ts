import { Component, inject } from '@angular/core';
import { AuthService, ThemesService, PostsService } from '../../../core/services';
import { PostModel, ThemeModel } from '../../../models';
import { Theme } from "../theme/theme";
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Post } from "../post/post";

@Component({
  selector: 'app-theme-board',
  imports: [Theme, CommonModule, RouterLink, Post],
  templateUrl: './theme-board.html',
  styleUrl: './theme-board.css'
})
export class ThemeBoard {
  private authService = inject(AuthService);
  readonly currentUser = this.authService.currentUser;
  readonly isLoggedIn = this.authService.isLoggedIn;

  themes$: Observable<ThemeModel[]>;
  posts$: Observable<PostModel[]>;
  
  constructor(
    private themesService: ThemesService, 
    private postsService: PostsService) {
    
    this.themes$ = this.themesService.getThemes();
    this.posts$ = this.postsService.getRecentPosts();
  }

}
