import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import { User } from "./user";
export interface Meeting {
    sessionId:string;
    user?:User,
    joined:boolean|false;
}
const initialState: Meeting ={
    sessionId:"",
    joined:false,
};
//  = {
//     name:"",
//     date:"",
//     members:[],
//     private:false,
//     time:""
// };
export const meetingSlice = createSlice({
  name: "meeting",
  initialState: initialState,
  reducers: {
    meetingModeTest: (state) => {
        state.joined=!state.joined;
        return state.joined;

    },
    // planCreateTest: (state, action: PayloadAction<Plan>) => {
    //   const { members, name,start,starttime, startdate, isPrivate} = action.payload;
    //   state.push({
    //     name: name,
    //     members: members,
    //     start: start,
    //     starttime:starttime,
    //     startdate:startdate,
    //     isPrivate:isPrivate,
    //   });
    // },
  },
});
export const { meetingModeTest } = meetingSlice.actions;
//getters
export const getMode = (state: RootState) => state.meeting.joined;
//
export default meetingSlice.reducer;
