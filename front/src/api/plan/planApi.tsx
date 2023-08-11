import {apiInstance} from "../index.tsx";
import {AxiosResponse} from "axios";
import {planResponseDto} from "./types.tsx";

const api = apiInstance();

export const findMyPlan = async <T = planResponseDto[], R = AxiosResponse<T>>() => {
    try {
        return await api.get<T, R>("/plan");
    } catch (err) {
        console.log(err)
        throw new Error('Failed to find My Plan')
    }
}