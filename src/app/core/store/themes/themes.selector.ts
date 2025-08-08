import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppState } from "..";
import { ThemeState } from "./themes.reducer";

export const selectThemesState = createFeatureSelector<ThemeState>('themes');

export const selectThemes = createSelector(
    selectThemesState,
    (state: ThemeState) => state.themes
);

export const selectThemesLoading = createSelector(
    selectThemesState,
    (state: ThemeState) => state.loading
);

export const selectThemesError = createSelector(
    selectThemesState,
    (state: ThemeState) => state.error
);