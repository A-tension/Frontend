import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import { Team } from "./group";
import { User } from "./user";

export interface Meeting {
  members?: User[] | string[] |Team; // axios에서 생성 요청시 자동반환
  name: string;
  date?: Date;
  time?: string;
  private?:boolean|false;
}
const initialState: Meeting[]=[];
//  = {
//     name:"",
//     date:"",
//     members:[],
//     private:false,
//     time:""
// };
export const meetSlice = createSlice({
  name: "meeting",
  initialState: initialState,
  reducers: {
    loadListTest: (state) => {
      state.push({
        name: "G1",
        teamId: 1,
        profileImg: "g1",
      });
      state.push({
        name: "G2",
        teamId: 2,
        profileImg: "g2",
      });
    },
    groupCreateTest: (state, action: PayloadAction<Team>) => {
      const { teamId, name, profileImg } = action.payload;
      state.push({
        name: name,
        teamId: teamId,
        profileImg: profileImg,
      });
    },
  },
});
export const { groupCreateTest, loadListTest } = groupSlice.actions;
//getters
export const getGrouplist = (state: RootState) => state.groups;
//
export default groupSlice.reducer;
