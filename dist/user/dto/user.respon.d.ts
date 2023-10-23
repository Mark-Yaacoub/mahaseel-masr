export declare class ResponseLogin<T> {
    status?: number;
    data?: T;
    messageEn?: string;
    messageAr?: string;
    constructor(status: number, data: T, accessToken: string, messageEn: string, messageAr: string);
}
export interface UserResponse {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    userName: string;
    profilePicture: string;
    verified: number;
    userRole: UserRole;
    otp: number;
    dateOfBirth: Date;
    accessToken: string;
}
