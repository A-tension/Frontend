import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import { Team } from "./group";
import { UUID } from "crypto";
import {teamResponseDto} from "../api/team/types.tsx";
import { Item } from "./item.ts";
import { v4 as uuidv4 } from "uuid";


export interface User {
  userId: UUID | "c5e0d81b-9eef-4b8c-9f11-153be5b18c2c";
  nickname?: string | "";
  email?: string | "";
  name?: string | "";
  profileImage?: string;
  tickets?: number; // 뽑기권
  meetingUrl?: string;
  myItems?: Item[];
  myGroups?: Team[];
  isLoggedIn?: boolean | false;
}

const initialState: User = {
  userId: uuidv4(),
  email: "",
  name: "",
  profileImage: "",
  tickets: 0,
  meetingUrl: "",
  myItems: [],
  myGroups: [],
  isLoggedIn: false,
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

    // myItems에 추가하는 함순데 안됨 
    addItem: (state, action: PayloadAction<Item>) => {
      state.myItems.push(action.payload); // myItems 배열에 아이템 추가
    },

    // getTeam: (state, action : PayloadAction<teamResponseDto>) => {
    //   const {
    //     teamId,
    //     name,
    //     profileImage,
    //   } = action.payload
    //   const teamTest : Team = {
    //     teamId : 349,
    //     name : name,
    //     profileImg : profileImage
    //   }
    //   state.push(teamTest);
    //   console.log("name")
    //   console.log(name);
    //   console.log("state")
    //   console.log(state)
    // },
    
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
      console.log("state.name = ", state.name)
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
    addUser: (state, action: PayloadAction<User>) => {
      state.push(action.payload); // 아이템을 배열에 추가
      addItemToUser(action.payload); // 이게 왜 안되는지는 모르겠음 ㅠㅠ
    },
  },
});
//action - dispatch

export const { userLoginTest, userLogin, userLogout,isLoggedIn, addItem } = userSlice.actions;

//getters
export const checkTickets = (state: RootState) => state.user.tickets;
export const getUserId = (state: RootState) => state.user.userId;
export const selectUser = (state: RootState) => state.user;
export const checkAuthority = (state: RootState) => state.user.isLoggedIn;
export const getUserGroups = (state: RootState) => state.user.myGroups;
//
export default userSlice.reducer;
