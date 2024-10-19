import { configureStore } from "@reduxjs/toolkit";
import projectSlice from "./Slice/ProjectSlice"

export const store = configureStore({
    reducer:{
        project : projectSlice
    }
});