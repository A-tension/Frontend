import {apiInstance} from "../index.tsx";
import {AxiosResponse} from "axios";
import {createTeamRequestBody, teamResponseDto} from "./types.tsx";

const api = apiInstance();

export const findMyTeam = async <T = teamResponseDto[], R = AxiosResponse<T>>(url:string)=> {
    try {
        return await api.get<T, R>(url);
    } catch (err) {
        console.log(err)
        throw new Error('Failed to find My Team');
    }
}

export const createTeam = async <T = void, R = AxiosResponse<T>>(url:string, data?: createTeamRequestBody):Promise<R> => {
    try {
        return await api.post<T, R>(url, data);
    } catch (err){
        console.log(err);
        throw new Error('Failed to create team');
    }
}


