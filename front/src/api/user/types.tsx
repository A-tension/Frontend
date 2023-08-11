export interface UserProfileUpdateDTO {
    name: string;
    profileImage: string;
}

export interface UserResponseDTO {
    email: string;
    name: string;
    profileImage: string;
    ticket: number;
    meetingUrl: string;
}