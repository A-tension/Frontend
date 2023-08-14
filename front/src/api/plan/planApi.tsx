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

// @GetMapping("/{teamId}")
// @Operation(summary = "팀 일정 조회", description = "팀의 일정 조회 요청 API 입니다.")
// public ResponseEntity<MessageWithData> getAllTeamPlans(@PathVariable Long teamId) {
//     List<PlanResponseDto> data = planService.getAllTeamPlans(teamId);
//     return new ResponseEntity<>(new MessageWithData(("그룹의 일정을 가져왔습니다."), data), HttpStatus.OK);
// }

export const getTeamPlan = async <T = planResponseDto[], R = AxiosResponse<T>>(teamId:bigint):Promise<R> => {
    try {
        return await api.get<T, R>(`/plan/${teamId}`);
    } catch (err) {
        console.log(err)
        throw new Error('Failed to find My Plan')
    }
}