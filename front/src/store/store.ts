import { configureStore } from "@reduxjs/toolkit";
import userReducer from '../store/user'
import groupReducer from '../store/group'
import planReducer from '../store/plan'
import meetingReducer from '../store/meeting'
import statusReducer from '../store/test'


export const store =configureStore({
    reducer:{
        user: userReducer,
        groups:groupReducer,
        plan:planReducer,
        meeting:meetingReducer,
        status:statusReducer,
    },
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
