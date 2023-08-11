import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import { User, userLoginTest } from "./user";

export interface Team {
  //로그인시 받아오는 유저의 그룹 목록에 있는 정보
  teamId?: bigint|number; // axios에서 생성 요청시 자동반환
  name: string;
  profileImg?: string;
  //이후 그룹 특정 조회시 추가되는 정보
  description?: string;
  members?: string[] | User[];
}
const initialState: Team[] = [];
export const groupSlice = createSlice({
  name: "groups",
  initialState: initialState,
  reducers: {
    loginload: (state, action) => {
      // state = action.payload; // 값을 직접 할당하는 것은 원칙에 어긋남
      return action.payload;
    },
    getGroupDetail: (state, action: PayloadAction<Team>) => {
      const updatedGroup = action.payload;
      const updatedState = state.map((group) =>
        group.teamId === updatedGroup.teamId ? updatedGroup : group
      );
      return updatedState;
    },
    loadListTest: (state) => {
      state.push({
        name: "G1",
        teamId: 1,
        profileImg: "g1",
        members: ["그룹원일", "그룹원이", "그룹원3"],
      });
      state.push({
        name: "G2",
        teamId: 2,
        profileImg: "g2",
        members: ["그룹원1", "2", "3"],
      });
      state.push({
        name: "그룹원관리 테스트",
        teamId: 2,
        profileImg: "g2",
        members: [
          { name: "그룹원1번", email: "dummy@ssafy.com", userId: "UUID JWT" },
          { name: "그룹원2번", email: "du@ssafy.com", userId: "UU JWT" },
          
        ],
      });
    },
    groupCreateTest: (state, action: PayloadAction<Team>) => {
      const { teamId, name, profileImg, members,description } = action.payload;
      state.push({
        name: name,
        teamId: teamId,
        profileImg: profileImg,
        members: members,
        description:description,
      });
    },
    // getGroupwithId:(state, action:PayloadAction<number>)=>{
    //   const findId = action.payload;
    //   const theGroup = state.find(group => group.teamId === findId);
    //   return theGroup;
    //   // If group is found, return a new state array with the modified group
    //   // if (theGroup) {
    //   //   return state.map(group =>
    //   //     group.teamId === findId ? /* modify the group here */ : group
    //   //   );
      
    // },
  },
});
export const { groupCreateTest, loadListTest, loginload } = groupSlice.actions;
//getters
export const getGrouplist = (state: RootState) => state.groups;
export const selectGroupById = (teamId: number) =>
  createSelector(
    (state: RootState) => state.groups,
    (groups: Team[]) => groups.find(group => group.teamId === teamId)
  );
export default groupSlice.reducer;
