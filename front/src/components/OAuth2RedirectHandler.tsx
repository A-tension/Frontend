import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
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
import { userLogin } from "../store/user.ts";
import { addItem } from "../store/item.ts";

function OAuth2RedirectHandler() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const [error, setError] = useState<string | null>();
  const [accessToken, setAccessToken] = useState<string | null>();
  const [refreshToken, setRefreshToken] = useState<string | null>();

  useEffect(() => {
    setAccessToken(getUrlParameter("accessToken"));
    setRefreshToken(getUrlParameter("refreshToken"));
    setError(getUrlParameter("error"));
  }, []);

  useEffect(() => {
    if (accessToken) {
      saveTokenToLocalStorage().then(() => {
        getUserInfos();
      });
    }
  }, [accessToken, refreshToken]);

  const getUrlParameter = (name: string) => {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    const regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
    const results = regex.exec(location.search);
    return results === null
      ? ""
      : decodeURIComponent(results[1].replace(/\+/g, " "));
  };
  const saveTokenToLocalStorage = async () => {
    if (accessToken != null && refreshToken != null) {
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
    } else {
      navigate("/login", { state: { from: location, error: error } });
    }
  };

  const getUserInfos = () => {
    getUserProfile<UserResponseDTO>().then((response) => {
      dispatch(userLogin(response.data.data));
    });


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
      // console.log(result.data);
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
  };

  return null; // Since we're doing redirects, there's nothing to render
}

export default OAuth2RedirectHandler;

// c2VzX01YanFnY2VvSDE=
