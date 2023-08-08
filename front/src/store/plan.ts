import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import { Team } from "./group";
import { User } from "./user";

export interface Plan {
  members?: User[] | string[] | Team["teamId"]; // axios에서 생성 요청시 자동반환
  name: string;
  start?: string;
  end?: string;
  private?:boolean|false;
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
      const { members, name,start  } = action.payload;
      state.push({
        name: name,
        members: members,
        start: start,
      });
    },
  },
});
export const { planCreateTest, loadListTest } = planSlice.actions;
//getters
export const getPlanlist = (state: RootState) => state.plan;
//
export default planSlice.reducer;
