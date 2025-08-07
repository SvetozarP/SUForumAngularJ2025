import { createReducer, on } from "@ngrx/store";
import { Post } from "../../../features/themes";
import { loadPosts, loadPostsFailure, loadPostsReset, loadPostsSuccess } from "./post.actions";

export interface PostState {
    posts: Post[];
    loading: boolean;
    error: any;
}

export const initialState: PostState = {
    posts: [],
    loading: false,
    error: null,
};

export const postReducer = createReducer(
    initialState,
    on(loadPosts, (state) => ({ ...state, loading: true })),
    on(loadPostsSuccess, (state, { posts }) => ({ ...state, posts, loading: false })),
    on(loadPostsFailure, (state, { error }) => ({ ...state, error, loading: false })),
    on(loadPostsReset, () => initialState)
);