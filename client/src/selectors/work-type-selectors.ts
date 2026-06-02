import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store/store";

const state = (state: RootState) => state.workTypeSlice;

const dataSelectors = createSelector(
    state,
    (state) => state.data,
)

const messageSelectors = createSelector(
    state,
    (state) => state.successMessage,
)

const loadingSelectors = createSelector(
    state,
    (state) => state.loading,
)

const errorSelectors = createSelector(
    state,
    (state) => state.errorMessage,
)


export { messageSelectors, loadingSelectors, errorSelectors, dataSelectors };