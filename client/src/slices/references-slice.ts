import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import {
    InitialState,
    ReferencePostResponse,
    CreateReferenceItem,
    ReferenceGetResponse
} from "../types/slices/references-slice";
import  { get, post, del, getOne, put } from "../service/api"

const initialState: InitialState = {
    data: [],
    successMessage: null,
    loading: false,
    errorMessage: null,
    sortOrder: null
}

export const fetchReferences = createAsyncThunk<ReferencePostResponse, CreateReferenceItem>("references/add", async (data) => {
    return await post("/reference-form", data);
});

export const getReferences = createAsyncThunk<ReferenceGetResponse, void>("references/get", async () => {
    return await get("/reference-form");
});

export const deleteReference = createAsyncThunk<void, number>(
    "references/delete",
    async (id) => {
        return await del(`/reference-form/${id}`);
    }
);

export const fetchReferenceById = createAsyncThunk("references/getOne",
    async (id: number) => {
        return await getOne(`/reference-form/${id}`);
    }
);

export const updateReference = createAsyncThunk("references/update",
    async ({ id, data }: { id: number; data: CreateReferenceItem }) => {
        return await put(`/reference-form/${id}`, data);
    }
);

const referencesSlice  = createSlice({
    name: "references-slice",
    initialState,
    reducers: {
        clearSuccessMessage(state: InitialState) {
            state.successMessage = null;
        },
        clearErrorMessage(state: InitialState) {
            state.errorMessage = null;
        },
        setSortOrder(state, action: PayloadAction<'asc' | 'desc' | null>) {
            state.sortOrder = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchReferences.pending, (state, action) => {
            state.loading = true;
        })
        builder.addCase(fetchReferences.fulfilled, (state, action) => {
            state.successMessage = action.payload.message;
            state.loading = false;
        })
        builder.addCase(fetchReferences.rejected, (state, action) => {
            state.errorMessage = action.error.message || null;
            state.loading = false;
        })

        builder.addCase(getReferences.pending, (state, action) => {
            state.loading = true;
        })
        builder.addCase(getReferences.fulfilled, (state, action) => {
            state.data = action.payload.data;
            state.loading = false;
        })
        builder.addCase(getReferences.rejected, (state, action) => {
            state.errorMessage = action.error.message || null;
            state.loading = false;
        })

        builder.addCase(deleteReference.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(deleteReference.fulfilled, (state, action) => {
            state.loading = false;
            state.successMessage = "Запись удалена";
        })
        builder.addCase(deleteReference.rejected, (state, action) => {
            state.errorMessage = action.error.message || "Ошибка при удалении";
            state.loading = false;
        })

        builder.addCase(fetchReferenceById.pending, (state) => {
            state.loading = true;
            state.errorMessage = null;
        })
        builder.addCase(fetchReferenceById.fulfilled, (state) => {
            state.loading = false;
        })
        builder.addCase(fetchReferenceById.rejected, (state, action) => {
            state.errorMessage = action.error.message || "Ошибка при загрузке записи";
            state.loading = false;
        })

        builder.addCase(updateReference.pending, (state) => {
            state.loading = true;
            state.errorMessage = null;
        })
        builder.addCase(updateReference.fulfilled, (state) => {
            state.successMessage = "Запись обновлена";
            state.loading = false;
        })
        builder.addCase(updateReference.rejected, (state, action) => {
            state.errorMessage = action.error.message || "Ошибка при обновлении";
            state.loading = false;
        })
    }
});

export const { clearSuccessMessage, setSortOrder, clearErrorMessage } = referencesSlice.actions;

export default referencesSlice.reducer;