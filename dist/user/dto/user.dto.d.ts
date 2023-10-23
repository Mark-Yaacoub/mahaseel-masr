export declare class CreateUserDto {
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    dateOfBirth: Date;
    profilePicture: string;
    password: string;
}
export declare class LoginDto {
    email: string;
    password: string;
}
export declare class ReSendOtp {
    email: string;
}
export declare class verifyUserDto {
    email: string;
    otp: number;
}
export declare class UpdateUserDto {
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    dateOfBirth: Date;
    profilePicture: string;
}
export declare class Pagination {
    page: number;
    limit: number;
    search?: string;
    sort?: string;
}
