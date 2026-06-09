import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { get, post } from "../service/api"
import {
    CreateWorkItem,
    InitialStateWorkType,
    WorkItem,
    WorkItemGetResponse,
    WorkItemPostResponse
} from "../types/slices/work-type-slice";

const initialState: InitialStateWorkType = {
    data: [],
    successMessage: null,
    loading: false,
    errorMessage: null
}

export const fetchWorkType = createAsyncThunk<WorkItemPostResponse, CreateWorkItem>("work-type/add", async (data) => {
    return await post("/work-type-form", data);
});

export const getWorkType = createAsyncThunk<WorkItemGetResponse, void>("work-type/get", async () => {
    return await get("/work-type-form");
});

const workTypeSlice  = createSlice({
    name: "work-type-slice",
    initialState,
    reducers: {
        clearSuccessMessage(state: InitialStateWorkType) {
            state.successMessage = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchWorkType.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(fetchWorkType.fulfilled, (state, action) => {
            state.successMessage = action.payload.message;
            state.loading = false;
        })
        builder.addCase(fetchWorkType.rejected, (state, action) => {
            state.errorMessage = action.error.message || null;
            state.loading = false;
        })
        builder.addCase(getWorkType.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(getWorkType.fulfilled, (state, action) => {
            state.data = action.payload.data;
            state.loading = false;
        })
        builder.addCase(getWorkType.rejected, (state, action) => {
            state.errorMessage = action.error.message || null;
            state.loading = false;
        })
    }
});

export const { clearSuccessMessage } = workTypeSlice.actions;

export default workTypeSlice.reducer;