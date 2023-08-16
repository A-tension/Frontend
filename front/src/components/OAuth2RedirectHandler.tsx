import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { findMyItemList } from "../api/item/itemApi";
import { FindMyItemResponseDto } from "../api/item/types";
import { findMyTeam } from "../api/team/teamApi.tsx";
import { teamResponseDto } from "../api/team/types.tsx";
import { addList } from "../store/group.ts";
import { useAppDispatch } from "../store/hooks.ts";
import { PlanResponseDto } from "../api/plan/types.tsx";
import { reloadPlans } from "../store/plan.ts";
import { Team } from "../store/group.ts";
import { User, userLogin } from "../store/user.ts";
import { Item } from "../store/item.ts";
import { findMyPlan } from "../api/plan/planApi.tsx";
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

        //내 정보 조회-저장
        getUserProfile<UserResponseDTO>()
          .then((response) => {
            console.log(response.data.data);
            const userData = response.data.data;
            dispatch(userLogin(userData));
          })
          .catch((error) => console.log("login auth data load error:" + error));
        // .then((userData)=>)
        // dispatch(userLogin())

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

          // 아래처럼 비동기 처리하면 다 받아와짐!!!!
          try {
            const response = await getUserProfile<UserResponseDTO>();
            console.log("response.data = ", response.data.data);
            const userProfile = response.data.data;
            console.log(userProfile);
            dispatch(userLogin(userProfile));
          } catch (error) {
            console.error(error);
            // 에러 처리 로직 추가
          }
          
        // 내가 속한 모든 그룹 조회
        findMyTeam<teamResponseDto[]>()
          .then(function (result) {
            console.log(result.data);
            dispatch(addList(result.data.data));
          })
          .catch((error) => {
            console.error(error);
            // 에러 처리 로직 추가
          });
        
        //내가 속한 그룹의 모든 일정 조회
        findMyPlan<PlanResponseDto[]>()
          .then(function (result) {
            console.log("myplans");
            console.log(result.data);
            dispatch(reloadPlans(result.data.data));
          })
          .catch((error) => {
            console.error(error);
            // 에러 처리 로직 추가
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
