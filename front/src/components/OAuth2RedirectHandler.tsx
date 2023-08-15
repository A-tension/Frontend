import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { findMyItemList } from "../api/item/itemApi";
import { FindMyItemResponseDto } from "../api/item/types";
import { findMyTeam } from "../api/team/teamApi.tsx";
import { teamResponseDto } from "../api/team/types.tsx";
import { addList } from "../store/group.ts";
import { useAppDispatch } from "../store/hooks.ts";
import { findMyPlan } from "../api/plan/planApi.tsx";
import { PlanResponseDto } from "../api/plan/types.tsx";
import { reloadPlans } from "../store/plan.ts";
import { userLogin } from "../store/user.ts";
import { getUserProfile } from "../api/user/userApi.tsx";
import { UserResponseDTO } from "../api/user/types.tsx";

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
            console.log(response.data); // 출력하고자 하는 데이터
            const myItem = response.data.data;
            console.log(myItem);
          })
          .catch((error) => {
            console.error(error);
            // 에러 처리 로직 추가
          });
        // 내가 속한 모든 그룹 조회
        findMyTeam<teamResponseDto[]>()
          .then(function (result) {
            console.log(result.data);
            dispatch(addList(result.data.data));
            // for(const teamResponseDto of result.data.data) {
            //   const team: Team = {
            //     teamId: teamResponseDto.teamId,
            //     name: teamResponseDto.name,
            //     profileImage: teamResponseDto.profileImage,
            //   };
            //   // dispatch(groupCreateTest(team));
            // }
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
            // for (const PlanResponseDto of result.data.data) {
            //   const plan: Plan = {
            //     id: PlanResponseDto.id,
            //     teamId: PlanResponseDto.teamId,
            //     name: PlanResponseDto.name,
            //     startTime: PlanResponseDto.startTime,
            //     endTime: PlanResponseDto.endTime,
            //   };
            //   dispatch(planCreateTest(plan));
            // }
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
