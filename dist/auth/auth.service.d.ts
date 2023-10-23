import { LoginDto } from 'src/user/dto/user.dto';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { ResponseLogin, UserResponse } from 'src/user/dto/user.respon';
export declare class AuthService {
    private userService;
    private jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    loginUser(dto: LoginDto): Promise<ResponseLogin<UserResponse>>;
}
