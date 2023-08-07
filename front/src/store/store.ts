import { configureStore } from "@reduxjs/toolkit";
import userReducer from '../store/user'
import groupReducer from '../store/group'
export const store =configureStore({
    reducer:{
        user: userReducer,
        groups:groupReducer,
    },
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
