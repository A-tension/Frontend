import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import { Team } from "./group";
import { User } from "./user";
import { planResponseDto } from "../api/plan/types";
import fillerImg from "../assets/Memoji.png";

export interface Plan extends planResponseDto {
  // 입력받아 요청할 때 필요한 항목
  id: number;
  teamId: number;
  name: string;
  startTime: string;
  endTime: string;
}
//BigInt(Number);
const currentDate = new Date();
const stringdate = currentDate.toISOString();
// date: new Date().toISOString().replace(/T.*$/, ''),// T뒤에 전부 자르고 날짜만 구할 때
// console.log(stringdate);
currentDate.setHours(currentDate.getHours() + 3);
const endString = currentDate.toISOString();
const initialState: Plan[] = [];
// {
//   id : 111, //사용자 입력으로 받을 수 없는 것 //extendedProps.id
//   teamId : 306,//사용자 입력으로 받을 수 없는 것 //extendedProps.teamId

//   name : "",//title
//   startTime : "",//start
//   endTime : "",//end
//   description : "", //extendedProps.description
//   teamName : "5B1F", //groupId
//   profileImage : fillerImg//extendedProps.profileImage
// }
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
          teamId: 406,
          name: "그룹별 테스트 ",
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
      const planExists = state.some((plan) => plan.id === id);
      if (!planExists) {
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
      } else {
        alert("error adding the plan : same id already exists");
      }
    },
    addPlans: (state, action: PayloadAction<Plan[]>) => {
      const loadedPlans = action.payload;
      // const nonDupes = loadedPlans.filter(newPlan=>!state.some(existingPlan => existingPlan.id === newPlan.id))
      // return [...state, ...nonDupes];
      //위에는 겹치면 저장하지 않는다, 하지만 수정된 정보는??
      //아래는 이전 버전 삭제한 배열에 새 배열 붙여서 새로 만들기

      return [
        ...state.filter(
          (oldPlan) =>
            !loadedPlans.some((newPlan) => newPlan.planId === oldPlan.planId)
        ),
        ...loadedPlans,
      ];
    },
  },
});
export const { planCreateTest, loadListTest, addPlans } = planSlice.actions;
//getters
export const getPlanlist = (state: RootState) => state.plan;
//
export default planSlice.reducer;
