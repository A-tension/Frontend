import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import { User } from "./user";
import { addItem as addItemToUser } from "./user"; // user Store의 addItem 액션을 가져옴

export interface Item {
  name: string;
  image: string;
  itemTypeId?: bigint;
  itemTypeName?: string;
  description?: string;
}
const initialState: Item[] = []; // 빈 배열로 초기화
export const itemSlice = createSlice({
  name: "item",
  initialState: initialState,
  reducers: {
    addItem: (state, action: PayloadAction<Item>) => {
      console.log("state : ", state);
      state.push(action.payload); // 아이템을 배열에 추가
      addItemToUser(action.payload); // 이게 왜 안되는지는 모르겠음 ㅠㅠ
    },
  
    itemLoginTest: (state, action: PayloadAction<Item[]>) => {      
      return action.payload;
    },
  },
  
});

export const { addItem, itemLoginTest } = itemSlice.actions;

// ... 나머지 코드
export const getItems = (state:RootState)=>state.item;
export default itemSlice.reducer as Reducer<Item[], AnyAction>; // 타입 어노테이션 추가
