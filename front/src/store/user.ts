import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import { Team } from "./group";
import { UUID } from "crypto";

export interface User {
  userId: UUID | "c5e0d81b-9eef-4b8c-9f11-153be5b18c2c";
  nickname?:string |"";
  email?: string | "";
  name?: string | "";
  profileImage?: string;
  tickets?: number; // 뽑기권
  meetingUrl?: string;
  myItems?: Item[];
  myGroups?: Team[];
    isLoggedIn?:boolean|false;
}
export interface Item {
  itemId: number;
  name: string;
  image: string;
}

const initialState: User = {
  userId: "",
  email: "",
  name: "",
  profileImage: "",
  tickets: 0,
  meetingUrl: "",
  myItems: [],
  myGroups: [],
  isLoggedIn:false
};

export const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    userLoginTest: (state) => {
      state.userId = "c5e0d81b-9eef-4b8c-9f11-153be5b18c2c";
      state.email = "ssafy@ssafy.com";
      state.name = "김싸피";
    },
    userLogin: (state, action: PayloadAction<User>) => {
      //axios
      const {
        userId,
        email,
        name,
        profileImage,
        tickets,
        meetingUrl,
        myItems,
        myGroups,
      } = action.payload;
      state.userId = userId;
      state.email = email;
      state.name = name;
      state.profileImage = profileImage;
      state.tickets = tickets;
      state.meetingUrl = meetingUrl;
      state.myItems = myItems;
      state.myGroups = myGroups;
      state.isLoggedIn = true;
    },
    userLogout: () => {
      console.log("log out call");
      return initialState; // 그냥 refresh/redirect to front page 가 나을 지도?
    },
    userRefresh: () => {
      //refresh token 혹은 상태 정보 업데이트시?
    },
    isLoggedIn: (state) => {
      return { ...state, isLoggedIn: state.email !== "" };
    },
    // hasAuthority: (state)=>{//  해당 그룹에 
    //   return state.isLoggedIn;
    // }
  },
});
//action - dispatch
export const { userLoginTest, userLogin, userLogout,isLoggedIn } = userSlice.actions;
//getters
export const checkTickets = (state:RootState)=> state.user.tickets;
export const getUserId = (state:RootState)=>state.user.userId;
export const selectUser = (state: RootState) => state.user;
export const checkAuthority = (state: RootState)=> state.user.isLoggedIn;
export const getUserGroups = (state: RootState) => state.user.myGroups;
//
export default userSlice.reducer;
