import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "./taskSlice";

const store = configureStore({
    reducer: {
        tasks: tasksReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store;
