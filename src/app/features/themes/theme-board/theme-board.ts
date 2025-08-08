import { Component, inject, OnDestroy } from '@angular/core';
import { AuthService, ThemesService } from '../../../core/services';
import { PostModel, ThemeModel } from '../../../models';
import { Theme } from "../theme/theme";
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Post } from "../post/post";
import { Store } from '@ngrx/store';
import { AppState } from '../../../core/store';
import { selectPosts } from '../../../core/store/posts/post.selector';
import { loadPosts, loadPostsReset } from '../../../core/store/posts/post.actions';
import { selectThemes } from '../../../core/store/themes/themes.selector';
import { loadThemes, loadThemesReset } from '../../../core/store/themes/themes.actions';

@Component({
  selector: 'app-theme-board',
  imports: [Theme, CommonModule, RouterLink, Post],
  templateUrl: './theme-board.html',
  styleUrl: './theme-board.css'
})
export class ThemeBoard implements OnDestroy {
  private authService = inject(AuthService);
  readonly isLoggedIn = this.authService.isLoggedIn;

  themes$: Observable<ThemeModel[]>;
  posts$: Observable<PostModel[]>;
  
  constructor(
    private store: Store<AppState>,

    ) {
    

    this.posts$ = this.store.select(selectPosts);
    this.themes$ = this.store.select(selectThemes);
    
    this.store.dispatch(loadPosts());
    this.store.dispatch(loadThemes());
  }

  ngOnDestroy(): void {
      this.store.dispatch(loadPostsReset());
      this.store.dispatch(loadThemesReset());
  }
}
