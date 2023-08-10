import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import { Team } from "./group";
import { User } from "./user";

export interface Plan {
  members?: User[] | string[] | Team["teamId"]; // axios에서 생성 요청시 자동반환
  teamId?:number;
  name: string;
  start?: string;// 하루종일
  startdate?:string;
  starttime?:string;
  end?: string;
  isPrivate?:boolean|false;
}
const initialState: Plan[]=[];
//  = {
//     name:"",
//     date:"",
//     members:[],
//     private:false,
//     time:""
// };
export const planSlice = createSlice({
  name: "plan",
  initialState: initialState,
  reducers: {
    loadListTest: (state) => {
      state.push({
        name: "G1",
        members:[{
            userId:"그룹원 일",
            email:"gmem@ssafy.com",
        },{
            name:"그룹원 2",
            email:"member@ssafy.com"
        }],
        start:"2023-08-08 18:00"
      });
      state.push({
        name: "G2",
        members: 2,
      });
    },
    planCreateTest: (state, action: PayloadAction<Plan>) => {
      const { members, name,start,starttime, startdate, isPrivate} = action.payload;
      state.push({
        name: name,
        members: members,
        start: start,
        starttime:starttime,
        startdate:startdate,
        isPrivate:isPrivate,
      });
    },
  },
});
export const { planCreateTest, loadListTest } = planSlice.actions;
//getters
export const getPlanlist = (state: RootState) => state.plan;
//
export default planSlice.reducer;
