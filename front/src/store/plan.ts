import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import { Team } from "./group";
import { User } from "./user";
import { planResponseDto } from "../api/plan/types";
import fillerImg from "../assets/Memoji.png";

export interface Plan extends planResponseDto {
  // id: number;
  teamId: number;
  name: string;
  startTime: string;
  endTime: string;
}
const currentDate = new Date();
const stringdate = currentDate.toISOString();
// date: new Date().toISOString().replace(/T.*$/, ''),
// console.log(stringdate);
currentDate.setHours(currentDate.getHours() + 3);
const endString = currentDate.toISOString();
const initialState: Plan[] = [{
  id : 111, //사용자 입력으로 받을 수 없는 것 //extendedProps.id
  teamId : 306,//사용자 입력으로 받을 수 없는 것 //extendedProps.teamId

  name : "",//title
  startTime : "",//start
  endTime : "",//end
  description : "", //extendedProps.description
  teamName : "5B1F", //groupId
  profileImage : fillerImg//extendedProps.profileImage
}
];
export const planSlice = createSlice({
  name: "plan",
  initialState: initialState,
  reducers: {
    loadListTest: (state) => {
      state.push(
        {
          id: 1,
          teamId: 306,
          name: "누르면 생기는 일정",
          startTime: stringdate,
          endTime: endString,
          description: "입력시 isostring 형태",
          teamName: "5b1f",
          profileImage: fillerImg,
        },
        {
          id: 714,
          teamId: 812,
          name: "테스트용일정",
          startTime: new Date().toISOString(),
          endTime: endString,
          description: "리덕스 스토어의 슬라이스 초기 상태",
          teamName: "이게진짜 맞나",
          profileImage: fillerImg,
        },
        {
          id: 555,
          teamId: 111,
          name: "테스트 ",
          startTime: new Date("2023-08-18T09:00:00").toISOString(),
          endTime: new Date("2023-08-18T18:00:00").toISOString(),
          description: "리덕스 스토어의 슬라이스 초기 상태",
          teamName: "이게진짜 맞나",
          profileImage: fillerImg,
        }
      );
    },
    planCreateTest: (state, action: PayloadAction<Plan>) => {
      const {
        id,
        teamId,
        name,
        startTime,
        endTime,
        description,
        teamName,
        profileImage,
      } = action.payload;
      state.push({
        id: id,
        teamId: teamId,
        name: name,
        startTime: startTime,
        endTime: endTime,
        description: description,
        teamName: teamName,
        profileImage: profileImage,
      });
    },
  },
});
export const { planCreateTest, loadListTest } = planSlice.actions;
//getters
export const getPlanlist = (state: RootState) => state.plan;
//
export default planSlice.reducer;
