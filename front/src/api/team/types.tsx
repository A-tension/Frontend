export interface myTeams{
    id : number,
    name : string,
    profileImage : string,
    description : string,
    teamParticipantList : object,
    uploadImageList : object,
}

export interface teamDetail{
    id : number,
    name : string,
    profileImage : string,
    description : string,
    userProfileDtoList : object,
}

export interface createTeamRequestBody{
    name : string,
    userIdList : object,
}

export interface teamResponseDto {
    teamId : bigint,
    name : string,
    profileImage : string,
}


