import { Injectable, inject } from "@angular/core";
import { PostsService } from "../../services";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, of } from "rxjs";
import * as PostActions from './post.actions';

@Injectable()
export class PostEffects {
    
    private actions$ = inject(Actions);
    private postService = inject(PostsService);

    loadPosts$ = createEffect(() => 
        this.actions$.pipe(
            ofType(PostActions.loadPosts),
            mergeMap(() => this.postService.getRecentPosts().pipe(
                map(posts => PostActions.loadPostsSuccess({ posts })),
                catchError(error => of(PostActions.loadPostsFailure({ error })))
            ))
        )
    );
}
