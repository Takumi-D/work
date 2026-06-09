import { WorkItem } from "./work-type-slice";

interface CreateReferenceItem {
    date: Date;
    workTypeId: number;
    volume: number;
    unit: string;
    workerName: string;
}

interface ReferenceItem extends CreateReferenceItem {
    id: string;
    workType: WorkItem
}

interface ReferencePostResponse {
    message: string;
}

interface ReferenceGetResponse {
    data: ReferenceItem[];
}

interface InitialState {
    data: ReferenceItem[];
    successMessage: string | null;
    loading: boolean;
    errorMessage: string | null;
    sortOrder: 'asc' | 'desc' | null;
}


export  { ReferenceItem, InitialState, ReferencePostResponse, ReferenceGetResponse, CreateReferenceItem };