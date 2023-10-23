import { AuthService } from './auth.service';
import { CreateUserDto, LoginDto, ReSendOtp, forgetPassword, verifyUserDto } from 'src/user/dto/user.dto';
import { UserService } from 'src/user/user.service';
export declare class AuthController {
    private readonly authService;
    private userService;
    constructor(authService: AuthService, userService: UserService);
    login(dto: LoginDto): Promise<import("../user/dto/user.respon").ResponseLogin<import("../user/dto/user.respon").UserResponse>>;
    registerUser(createUserDto: CreateUserDto): Promise<import("../shared/response").Response<import("../user/user.entity").User>>;
    reSendOtp(dto: ReSendOtp): Promise<any>;
    verifyUser(dto: verifyUserDto): Promise<any>;
    forgetPassword(dto: forgetPassword): Promise<any>;
}
