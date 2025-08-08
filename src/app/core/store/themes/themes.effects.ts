import { Injectable, inject } from "@angular/core";
import { PostsService, ThemesService } from "../../services";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, of } from "rxjs";
import * as ThemeActions from './themes.actions';

@Injectable()
export class ThemesEffects {
    
    private actions$ = inject(Actions);
    private themesService = inject(ThemesService);

    loadThemes$ = createEffect(() => 
        this.actions$.pipe(
            ofType(ThemeActions.loadThemes),
            mergeMap(() => this.themesService.getThemes().pipe(
                map(themes => ThemeActions.loadThemesSuccess({ themes })),
                catchError(error => of(ThemeActions.loadThemesFailure({ error })))
            ))
        )
    );
}
