import { Model } from 'mongoose';
import { CreateUserDto, ReSendOtp, verifyUserDto } from './dto/user.dto';
import { User } from './user.entity';
import { UserDocument } from './user.entity';
import { Response } from 'src/shared/response';
import { SendEmailService } from 'src/SendEmail/sendemail.service';
export declare class UserService {
    private readonly userModel;
    private sendEmailService;
    constructor(userModel: Model<UserDocument>, sendEmailService: SendEmailService);
    findUser(email: string): Promise<boolean>;
    registerUser(createUserDto: CreateUserDto): Promise<Response<User>>;
    findUserByEmail(email: string): Promise<User>;
    comparePasswords(enteredPassword: string, hashedPassword: string): Promise<boolean>;
    reSendOtp(dto: ReSendOtp): Promise<any>;
    verifyUser(dto: verifyUserDto): Promise<any>;
    generateRandomOTP(): string;
}
