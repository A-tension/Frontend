import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

export interface Team {
  teamId?: number; // axios에서 생성 요청시 자동반환
  name: string;
  profileImg?: string;
  dsecription?: string;
}
const initialState: Team[] = [];
export const groupSlice = createSlice({
  name: "groups",
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
