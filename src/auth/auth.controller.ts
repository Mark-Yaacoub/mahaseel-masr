import { Body, Controller, Post, Res, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginDto, ReSendOtp, verifyUserDto } from 'src/user/dto/user.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from 'src/user/user.service';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
    constructor(private readonly authService: AuthService ,
      private userService: UserService,
      ) {}


    @Post('login')
    @ApiOperation({ summary: 'User Login' })    
    @ApiBody({ type: LoginDto }) 
    @UsePipes(new ValidationPipe())

    async login(@Body() dto: LoginDto) {
    return await this.authService.loginUser(dto);
    }

    @Post('register')
    @ApiOperation({ summary: 'Register a new user', description: 'Register a new user' })
    @UsePipes(new ValidationPipe())
    @ApiBody({ type: CreateUserDto })
    async registerUser(@Body() createUserDto: CreateUserDto) {
      return await this.userService.registerUser(createUserDto);
    }

    @Post('reSendOtp')
    @ApiOperation({ summary: 'Re-send OTP', description: 'Re-send OTP to a user' })
    @UsePipes(new ValidationPipe())
    @ApiBody({ type: ReSendOtp })
    async reSendOtp(@Body() dto: ReSendOtp) {
      return await this.userService.reSendOtp(dto);
    }

    @Post('/verifyUser')
    @ApiOperation({ summary: 'Verify user using OTP' })
    @ApiBody({ type: verifyUserDto })
    @ApiResponse({ status: 200, description: 'User verified successfully' })
    @ApiResponse({ status: 400, description: 'User not found or invalid OTP' })
    @ApiResponse({ status: 500, description: 'Internal Server Error' })
    async verifyUser(@Body() dto: verifyUserDto): Promise<any> {
      return await this.userService.verifyUser(dto);
    }
}
