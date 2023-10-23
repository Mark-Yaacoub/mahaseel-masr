/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { Model } from 'mongoose';
import { CreateUserDto, ReSendOtp, UpdatePasswordDto, UpdateUserDto, forgetPassword, verifyUserDto } from './dto/user.dto';
import { User } from './user.entity';
import { UserDocument } from './user.entity';
import { Response } from 'src/shared/response';
import { SendEmailService } from 'src/sendEmail/sendEmail.service';
export declare class UserService {
    private readonly userModel;
    private sendEmailService;
    constructor(userModel: Model<UserDocument>, sendEmailService: SendEmailService);
    findUser(email: string): Promise<boolean>;
    registerUser(createUserDto: CreateUserDto): Promise<Response<User>>;
    findUserByEmail(email: string): Promise<User>;
    findUserById(id: string): Promise<User>;
    findUserAllDetailsById(id: string): Promise<User>;
    comparePasswords(enteredPassword: string, hashedPassword: string): Promise<boolean>;
    reSendOtp(dto: ReSendOtp): Promise<any>;
    verifyUser(dto: verifyUserDto): Promise<Response<User>>;
    updateUser(userId: string, dto: UpdateUserDto): Promise<Response<User>>;
    findAllUsers(page: number, limit: number): Promise<{
        data: (import("mongoose").Document<unknown, {}, UserDocument> & User & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        })[];
        page: number;
        limit: number;
        totalCount: number;
    }>;
    generateRandomOTP(): string;
    forgetPassword(dto: forgetPassword): Promise<any>;
    updatePassword(userId: string, dto: UpdatePasswordDto): Promise<Response<User>>;
    checkCurrentPasswordValidity(currentPassword: string, userId: string): Promise<boolean>;
    generateRandomPassword(): Promise<string>;
}
