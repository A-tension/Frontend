import { useLocation, useNavigate } from "react-router-dom";

import { useEffect } from "react";
import { findMyItemList } from "../api/item/itemApi";
import { FindMyItemResponseDto } from "../api/item/types";
import { findMyTeam } from "../api/team/teamApi.tsx";
import { teamResponseDto } from "../api/team/types.tsx";
import { groupCreateTest } from "../store/group.ts";
import { useAppDispatch } from "../store/hooks.ts";
import { Team } from "../store/group.ts";
import { User, userLogin } from "../store/user.ts";
import { Item } from "../store/item.ts";
import { findMyPlan } from "../api/plan/planApi.tsx";
import { planResponseDto } from "../api/plan/types.tsx";
import { Plan, planCreateTest } from "../store/plan.ts";
import { getUserProfile } from "../api/user/userApi.tsx";
import { UserResponseDTO } from "../api/user/types.tsx";
import { addItem } from "../store/item.ts";

function OAuth2RedirectHandler() {
  const navigate = useNavigate();
  const location = useLocation();

  const getUrlParameter = (name: string) => {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    const regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
    const results = regex.exec(location.search);
    return results === null
      ? ""
      : decodeURIComponent(results[1].replace(/\+/g, " "));
  };

  const accessToken = getUrlParameter("accessToken");
  const refreshToken = getUrlParameter("refreshToken");

  const error = getUrlParameter("error");
  const dispatch = useAppDispatch();

  useEffect(() => {
    const setTokenToLocalStorage = async () => {
      if (accessToken != null && refreshToken != null) {
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        // 내 아이템 조회
        findMyItemList<FindMyItemResponseDto>()
          .then((response) => {
            console.log("myItemList = ", response.data.data);
            const myItemList = response.data.data.myItemDtoList; 
            // myItem 돌면서 myItemDtoList
            for (const myItemDto of myItemList) {                
                const item : Item = {
                    name : myItemDto.name,
                    image : myItemDto.image,
                    itemTypeId : myItemDto.itemTypeId,
                    itemTypeName : myItemDto.itemTypeName,
                    description : myItemDto.description,
                }
                dispatch(addItem(item))
            } })
          .catch((error) => {
            console.error(error);
            // 에러 처리 로직 추가
          });

          // 로그인 시에 user 정보 가져오기 
          getUserProfile<UserResponseDTO>()
          .then((response) => {
            console.log("response.data = ", response.data.data);
            const userProfile = response.data.data;
            dispatch(userLogin(userProfile))            
          })
          .catch((error) => {
            console.error(error);
            // 에러 처리 로직 추가
          });

        findMyTeam<teamResponseDto>().then(function (result) {
          console.log(result.data);

          for (const teamResponseDto of result.data.data) {
            const team: Team = {
              teamId: teamResponseDto.teamId,
              name: teamResponseDto.name,
              profileImg: teamResponseDto.profileImg,
            };
            dispatch(groupCreateTest(team));
          }
        });

        findMyPlan<planResponseDto>().then(function (result) {
          console.log(result.data);
          for (const planResponseDto of result.data.data) {
            const plan: Plan = {
              id: planResponseDto.id,
              teamId: planResponseDto.teamId,
              name: planResponseDto.name,
              startTime: planResponseDto.startTime,
              endTime: planResponseDto.endTime,
            };
            dispatch(planCreateTest(plan));
          }
        });
      } else {
        navigate("/login", { state: { from: location, error: error } });
      }
    };
    setTokenToLocalStorage().then(() => {
      navigate("/");
    });
  }, []);

  return null; // Since we're doing redirects, there's nothing to render
}

export default OAuth2RedirectHandler;
