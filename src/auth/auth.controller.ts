import { Body, Controller, Post, Res, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginDto } from 'src/user/dto/user.dto';
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
}
