import { createAction, props } from "@ngrx/store";
import { ThemeModel } from "../../../models";

export const loadThemes = createAction('[Themes] Load Themes');

export const loadThemesSuccess = createAction(
    '[Themes] Load Themes Success', 
    props<{ themes: ThemeModel[] }>()
);

export const loadThemesFailure = createAction(
    '[Themes] Load Themes Failure',
    props<{ error: any }>()
);

export const loadThemesReset = createAction('[Themes] Load Themes Reset');