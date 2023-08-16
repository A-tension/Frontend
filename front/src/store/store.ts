import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../store/user";
import groupReducer from "../store/group";
import planReducer from "../store/plan";
import meetingReducer from "../store/meeting";
import itemReducer from "../store/item";
import statusReducer from "../store/test";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root", // localStorage key
  storage, // localStorage
  whitelist: ["auth"], // target (reducer name)
}


export const store = configureStore({
  reducer: {
    user: userReducer,
    groups: groupReducer,
    plan: planReducer,
    meeting: meetingReducer,
    status: statusReducer,
    item: itemReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;