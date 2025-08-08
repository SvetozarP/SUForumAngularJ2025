import { ActionReducerMap } from '@ngrx/store';
import * as fromPosts from './posts/post.reducer';
import * as fromThemes from './themes/themes.reducer';

export interface AppState {
    posts: fromPosts.PostState;
    themes: fromThemes.ThemeState;
}

export const reducers: ActionReducerMap<AppState> = {
    posts: fromPosts.postReducer,
    themes: fromThemes.themesReducer
}