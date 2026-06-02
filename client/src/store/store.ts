import { configureStore } from "@reduxjs/toolkit";
import referencesSlice from "../slices/references-slice"
import workTypeSlice from "../slices/work-type-slice"

const store = configureStore({
    reducer: {
        referencesSlice,
        workTypeSlice
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store