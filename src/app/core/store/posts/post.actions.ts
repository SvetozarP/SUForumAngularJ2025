import { createAction, props } from "@ngrx/store";
import { PostModel } from "../../../models";

export const loadPosts = createAction('[Posts] Load Posts');

export const loadPostsSuccess = createAction(
    '[Posts] Load Posts Success', 
    props<{ posts: PostModel[] }>()
);

export const loadPostsFailure = createAction(
    '[Posts] Load Posts Failure',
    props<{ error: any }>()
);

export const loadPostsReset = createAction('[Posts] Load Posts Reset');