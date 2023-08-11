import { useLocation, useNavigate } from 'react-router-dom';
import {useEffect} from "react";
import {findMyTeam} from "../api/team/teamApi.tsx";
import {teamResponseDto} from "../api/team/types.tsx";
import {groupCreateTest} from "../store/group.ts";
import {useAppDispatch} from "../store/hooks.ts";
import {forEach} from "react-bootstrap/ElementChildren";
import {Team} from "../store/group.ts";
import {findMyPlan} from "../api/plan/planApi.tsx";
import {planResponseDto} from "../api/plan/types.tsx";
import {Plan, planCreateTest} from "../store/plan.ts";

function OAuth2RedirectHandler() {
    const navigate = useNavigate();
    const location = useLocation();

    const getUrlParameter = (name:string) => {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        const results = regex.exec(location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    };

    const accessToken = getUrlParameter('accessToken');
    const refreshToken = getUrlParameter('refreshToken');

    const error = getUrlParameter('error');
    const dispatch = useAppDispatch();

    useEffect(()=>{
        if (accessToken != null && refreshToken != null ) {
            console.log("accessToken : " + accessToken)
            console.log("refreshToken : " + refreshToken)
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
            navigate('/');

            const myTeam =  findMyTeam<teamResponseDto>();
            myTeam.then(function (result) {
                console.log(result.data);
                for (const teamResponseDto of result.data.data) {
                    const team : Team = {
                        teamId : teamResponseDto.teamId,
                        name : teamResponseDto.name,
                        profileImg : teamResponseDto.profileImg,
                    }
                    dispatch(groupCreateTest(team))
                }
            })
            const myPlan = findMyPlan<planResponseDto>();
            myPlan.then(function (result) {
                console.log(result.data);
                for (const planResponseDto of result.data.data) {
                    const plan : Plan = {
                        id : planResponseDto.id,
                        teamId : planResponseDto.teamId,
                        name : planResponseDto.name,
                        startTime : planResponseDto.startTime,
                        endTime : planResponseDto.endTime
                    }
                    dispatch(planCreateTest(plan))
                }
            })
        } else {
            navigate('/login', { state: { from: location, error: error } });
        }
    }, [])

    return null; // Since we're doing redirects, there's nothing to render
}

export default OAuth2RedirectHandler;