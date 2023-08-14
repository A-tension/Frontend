import { useLocation, useNavigate } from 'react-router-dom';

import {useEffect, useState} from "react";
import {findMyItemList} from "../api/item/itemApi"
import { FindMyItemResponseDto } from '../api/item/types';
import {findMyTeam} from "../api/team/teamApi.tsx";
import {teamResponseDto} from "../api/team/types.tsx";
import {groupCreateTest} from "../store/group.ts";
import {useAppDispatch} from "../store/hooks.ts";
import {forEach} from "react-bootstrap/ElementChildren";
import {Team} from "../store/group.ts";
import {findMyPlan} from "../api/plan/planApi.tsx";
import {planResponseDto} from "../api/plan/types.tsx";
import { Item, itemLoginTest } from '../store/item.ts';
import {Plan, planCreateTest} from "../store/plan.ts";
import {addItem} from "../store/item.ts";

function OAuth2RedirectHandler() {
    const navigate = useNavigate();
    const location = useLocation();
    
    // 내 아이템 
  


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
        // 로그인 
        if (accessToken != null && refreshToken != null ) {
            console.log("accessToken : " + accessToken)
            console.log("refreshToken : " + refreshToken)
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
            // 내 아이템 조회 
            findMyItemList<FindMyItemResponseDto>()
            .then(response => {
                const myItemList = response.data.data.myItemDtoList; 
                console.log(myItemList);        
                // myItem 돌면서 myItemDtoList
                for (const myItemDto of myItemList) {
                    
                    const item : Item = {
                        name : myItemDto.name,
                        image : myItemDto.image,
                        itemTypeId : myItemDto.itemTypeId,
                        itemTypeName : myItemDto.itemTypeName,
                        description : myItemDto.description,
                    }
                    console.log(item);
                    dispatch(addItem(item))
                }       
                navigate('/');
            })
            .catch(error => {
                console.error(error);
                // 에러 처리 로직 추가
            });
            navigate('/');


            // 내 팀 찾기 : 팀id, 팀이름, 팀 프로필 이미지
            const myTeam =  findMyTeam<teamResponseDto[]>();
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