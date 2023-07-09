import { ExtendedTask } from "@/types/db";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { TaskPayload, UpdateTaskPayload } from "@/lib/validators/task";

interface TaskState {
    tasks: ExtendedTask[];
    task: ExtendedTask | null;
    isFetchingTasks: boolean;
    isFetchingTask: boolean;
    isCreatingTask: boolean;
    isUpdatingTask: boolean;
    error: string | null;
    sortByAsc: boolean;
}

const initialState: TaskState = {
    tasks: [],
    task: null,
    isFetchingTasks: false,
    isFetchingTask: false,
    isCreatingTask: false,
    isUpdatingTask: false,
    error: null,
    sortByAsc: true,
};

export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
    try {
        const { data } = await axios.get("/api/task");
        return data as ExtendedTask[];
    } catch (error) {
        throw Error("Failed to fetch tasks");
    }
});

export const fetchTask = createAsyncThunk(
    "tasks/fetchTask",
    async (taskId: string) => {
        try {
            const { data } = await axios.get(`/api/task/${taskId}`);
            return data as ExtendedTask;
        } catch (error) {
            throw Error("Failed to fetch tasks");
        }
    }
);

export const addTask = createAsyncThunk(
    "tasks/addTask",
    async (taskPayload: TaskPayload) => {
        try {
            const { data } = await axios.put("/api/task", taskPayload);

            return data;
        } catch (err) {
            throw Error("Failed to update task");
        }
    }
);

export const updateTask = createAsyncThunk(
    "tasks/updateTask",
    async (taskPayload: UpdateTaskPayload) => {
        try {
            const { data } = await axios.post(
                `/api/task/${taskPayload.id}`,
                taskPayload
            );

            return data;
        } catch (err) {
            throw Error("Failed to update task");
        }
    }
);

export const deleteTask = createAsyncThunk(
    "tasks/deleteTask",
    async (taskId: string) => {
        try {
            const { data } = await axios.delete(`/api/task/${taskId}`);

            return data;
        } catch (err) {
            throw Error("Failed to update task");
        }
    }
);

const tasksSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        toggleSort: (state) => {
            state.sortByAsc = !state.sortByAsc;
            state.tasks = [...state.tasks].sort((a, b) => {
                const titleA = a.title.toLowerCase();
                const titleB = b.title.toLowerCase();
                if (state.sortByAsc) {
                    if (titleA < titleB) return -1;
                    if (titleA > titleB) return 1;
                    return 0;
                } else {
                    if (titleA > titleB) return -1;
                    if (titleA < titleB) return 1;
                    return 0;
                }
            });
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTasks.pending, (state) => {
                state.isFetchingTasks = true;
                state.error = null;
            })
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state.isFetchingTasks = false;
                state.tasks = action.payload;
            })
            .addCase(fetchTasks.rejected, (state, action) => {
                state.isFetchingTasks = false;
                state.error =
                    action.error.message ||
                    "Something went wrong when loading your tasks";
            })
            .addCase(fetchTask.pending, (state) => {
                state.isFetchingTask = true;
                state.error = null;
            })
            .addCase(fetchTask.fulfilled, (state, action) => {
                state.isFetchingTask = false;
                state.task = action.payload;
            })
            .addCase(fetchTask.rejected, (state, action) => {
                state.isFetchingTask = false;
                state.error =
                    action.error.message ||
                    "Something went wrong when loading your task";
            })
            .addCase(addTask.pending, (state) => {
                state.isCreatingTask = true;
                state.error = null;
            })
            .addCase(addTask.fulfilled, (state, action) => {
                state.isCreatingTask = false;
            })
            .addCase(addTask.rejected, (state, action) => {
                state.isCreatingTask = false;
                state.error =
                    action.error.message ||
                    "Something went wrong when updating your task";
            })
            .addCase(updateTask.pending, (state) => {
                state.isUpdatingTask = true;
                state.error = null;
            })
            .addCase(updateTask.fulfilled, (state, action) => {
                state.isUpdatingTask = false;
            })
            .addCase(updateTask.rejected, (state, action) => {
                state.isUpdatingTask = false;
                state.error =
                    action.error.message ||
                    "Something went wrong when updating your task";
            })
            .addCase(deleteTask.fulfilled, (state, action) => {
                state.tasks = state.tasks.filter(
                    (task) => task.id !== action.payload.id
                );
            });
    },
});

export const { toggleSort } = tasksSlice.actions;

export default tasksSlice.reducer;
