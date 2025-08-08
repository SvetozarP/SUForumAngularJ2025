import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppState } from "..";
import { PostState } from "./post.reducer";

export const selectPostsState = createFeatureSelector<PostState>('posts');

export const selectPosts = createSelector(
    selectPostsState,
    (state: PostState) => state.posts
);

export const selectPostsLoading = createSelector(
    selectPostsState,
    (state: PostState) => state.loading
);

export const selectPostsError = createSelector(
    selectPostsState,
    (state: PostState) => state.error
);