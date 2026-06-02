interface CreateWorkItem {
    name: string;
}

interface WorkItem {
    id: number;
    name: string;
}

interface WorkItemPostResponse {
    message: string;
}

interface WorkItemGetResponse {
    data: WorkItem[];
}

interface InitialStateWorkType {
    data: WorkItem[];
    successMessage: string | null;
    loading: boolean;
    errorMessage: string | null;
}

export { CreateWorkItem, WorkItem, InitialStateWorkType, WorkItemPostResponse, WorkItemGetResponse };