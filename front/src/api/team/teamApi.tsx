import {apiInstance} from "../index.tsx";
import {AxiosResponse} from "axios";
import {myTeams, createTeamReqeustBody} from "./types.tsx";

const api = apiInstance();

export const createTeam = async <T = myTeams, R = AxiosResponse<T>>(url:string, data?: createTeamReqeustBody):Promise<R> => {
    try {
        return await api.post<T, R>(url, data);
    } catch (err){
        console.log(err);
        throw new Error('Failed to create team');
    }
}


