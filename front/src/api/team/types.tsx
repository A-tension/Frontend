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

export interface createTeamReqeustBody{
    name : string,
    userIdList : object,
}


