import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store/store";

const state = (state: RootState) => state.referencesSlice;

const dataSelectors = createSelector(
    state,
    (state) => state.data,
)

const selectSortOrder = createSelector(
    state,
    (state) => state.sortOrder,
)

const messageSelectors = createSelector(
    state,
    (state) => state.successMessage,
)

const loadingSelectors = createSelector(
    state,
    (state) => state.loading,
)

const errorMessageSelectors = createSelector(
    state,
    (state) => state.errorMessage,
)

export const selectSortedData = createSelector(
    [state, selectSortOrder],
    (state, sortOrder) => {
        if (!sortOrder) return state.data;

        return [...state.data].sort((a, b) => {
            const dateA = new Date(a.date).getTime();
            const dateB = new Date(b.date).getTime();
            return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
        });
    }
);


export { dataSelectors, loadingSelectors, errorMessageSelectors, messageSelectors, selectSortOrder };