import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import type { RootState } from './store'
import { Team } from './group';


export interface User{
    userId?:string|"";
    email?:string|"";
    name?:string|"";
    profileImage?:string;
    tickets?:number; // 뽑기권
    meetingUrl?:string;
    myItems?:Item[];
    myGroups?:Team[];
    
}
export interface Item {
    itemId:number;
    name:string;
    image:string;
}

const initialState : User= 
{
    userId: "",
    email: "",
    name: "",
    profileImage: "",
    tickets: 0,
    meetingUrl: "",
    myItems: [],
    myGroups: []
}

export const userSlice = createSlice({
    name:"user",
    initialState:initialState,
    reducers:{
        userLoginTest:(state) =>{
            state.userId ="testuser"
            state.email="ssafy@ssafy.com"
            state.name="김싸피"
        },
        userLogin:(state, action:PayloadAction<User>)=>{
            const { userId, email, name, profileImage, tickets, meetingUrl, myItems, myGroups } = action.payload;
            state.userId = userId;
            state.email = email;
            state.name = name;
            state.profileImage = profileImage;
            state.tickets = tickets;
            state.meetingUrl = meetingUrl;
            state.myItems = myItems;
            state.myGroups = myGroups;
        }

    },
    
})
//action - dispatch
export const {userLoginTest,userLogin} =userSlice.actions;
//getters
export const selectUser = (state: RootState)=> state.user;
//
export default userSlice.reducer;