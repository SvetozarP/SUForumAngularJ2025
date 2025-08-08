import { createReducer, on } from "@ngrx/store";
import { loadThemes, loadThemesFailure, loadThemesReset, loadThemesSuccess } from "./themes.actions";
import { PostModel, ThemeModel } from "../../../models";

export interface ThemeState {
    themes: ThemeModel[];
    loading: boolean;
    error: any;
}

export const initialState: ThemeState = {
    themes: [],
    loading: false,
    error: null,
};

export const themesReducer = createReducer(
    initialState,
    on(loadThemes, (state) => ({ ...state, loading: true })),
    on(loadThemesSuccess, (state, { themes }) => ({ ...state, themes, loading: false })),
    on(loadThemesFailure, (state, { error }) => ({ ...state, error, loading: false })),
    on(loadThemesReset, () => initialState)
);