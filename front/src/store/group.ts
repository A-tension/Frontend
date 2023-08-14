import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import { User, userLoginTest } from "./user";
import { teamDetailResponseDto, userProfileDto } from "../api/team/types";

export interface Team {
  //로그인시 받아오는 유저의 그룹 목록에 있는 정보
  teamId?: bigint|number; // axios에서 생성 요청시 자동반환
  name: string;
  profileImage?: string;
  //이후 그룹 특정 조회시 추가되는 정보
  description?: string;
  members?: string[] | User[]|userProfileDto[];
}
const initialState: Team[] = [
  {
    "teamId": 456,
    "name": "Advanced Team",
    "profileImage": "team456.png",
  },
];
// const convertedTest = { ...test, teamId: Number(test.teamId) };
export const groupSlice = createSlice({
  name: "groups",
  initialState: initialState,
  reducers: {
    loginload: (state, action: PayloadAction<Team>) => {
      const { teamId, name, profileImage } = action.payload;
      state.push({
        name: name,
        teamId: teamId,
        profileImage: profileImage,
      });
    },
    getGroupDetail: (state, action: PayloadAction<Team>) => {
      const updatedGroup = action.payload;
      const updatedState = state.map((group) =>
        group.teamId === updatedGroup.teamId ? updatedGroup : group
      );
      return updatedState;
    },
    loadListTest: (state) => {
      return[...state,{
        name: "G1",
        teamId: 1,
        profileImage: "g1",
        members: ["그룹원일", "그룹원이", "그룹원3"],
      },{
        name: "G2",
        teamId: 2,
        profileImage: "g2",
        members: ["그룹원1", "2", "3"],
      },{
        name: "그룹원관리 테스트",
        teamId: 2,
        profileImage: "g2",
        members: [
          // { name: "그룹원1번", email: "dummy@ssafy.com",userId: },
          // { name: "그룹원2번", email: "du@ssafy.com", userId: },
          
        ],
      }]
      state.push({
        name: "G1",
        teamId: 1,
        profileImage: "g1",
        members: ["그룹원일", "그룹원이", "그룹원3"],
      },{
        name: "G2",
        teamId: 2,
        profileImage: "g2",
        members: ["그룹원1", "2", "3"],
      },{
        name: "그룹원관리 테스트",
        teamId: 2,
        profileImage: "g2",
        members: [
          // { name: "그룹원1번", email: "dummy@ssafy.com",userId: },
          // { name: "그룹원2번", email: "du@ssafy.com", userId: },
          
        ],
      });
      state.push({
        name: "G2",
        teamId: 2,
        profileImage: "g2",
        members: ["그룹원1", "2", "3"],
      });
      state.push({
        name: "그룹원관리 테스트",
        teamId: 2,
        profileImage: "g2",
        members: [
          // { name: "그룹원1번", email: "dummy@ssafy.com",userId: },
          // { name: "그룹원2번", email: "du@ssafy.com", userId: },
          
        ],
      });
    },
    groupCreateTest: (state, action: PayloadAction<Team>) => {
      const { teamId, name, profileImage, members,description } = action.payload;
      state.push({
        name: name,
        teamId: teamId,
        profileImage: profileImage,
        members: members,
        description:description,
      });
    },
    // teamId : bigint,
    // name : string,
    // profileImage : string,
    // description : string,
    // userProfileDtoList : userProfileDto[],},

    addDetail:(state, action:PayloadAction<teamDetailResponseDto>)=>{
      const findId = action.payload.teamId;
      const details = action.payload;
      // const theGroup = state.find(group => group.teamId === findId);
      // return theGroup;
      // If group is found, return a new state array with the modified group
      // if (theGroup) {
        return state.map(group =>
          group.teamId === findId ? details : group
        );
      
    }
  },
});
export const { groupCreateTest, loadListTest, addDetail,loginload} = groupSlice.actions;
//getters
export const getGrouplist = (state: RootState) => state.groups;
export const selectGroupById = (teamId: bigint) =>
  createSelector(
    (state: RootState) => state.groups,
    (groups: Team[]) => groups.find(group => group.teamId === teamId)
  );
export default groupSlice.reducer;
