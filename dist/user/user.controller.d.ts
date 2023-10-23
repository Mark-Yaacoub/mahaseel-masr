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
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { UserService } from './user.service';
import { UpdatePasswordDto, UpdateUserDto } from './dto/user.dto';
import { User } from './user.entity';
import { Response } from 'src/shared/response';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    findAllUsers(page: number, limit: number): Promise<{
        data: (import("mongoose").Document<unknown, {}, import("./user.entity").UserDocument> & User & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        })[];
        page: number;
        limit: number;
        totalCount: number;
    }>;
    findUserById(id: string): Promise<User>;
    updateUser(id: string, dto: UpdateUserDto): Promise<Response<User>>;
    updatePassword(id: string, dto: UpdatePasswordDto): Promise<Response<User>>;
    deleteUser(id: string): Promise<Response<User>>;
}
