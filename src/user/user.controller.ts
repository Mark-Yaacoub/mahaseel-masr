import {
  Controller,
  Get,
  Post,
  Request,
  Put,
  Delete,
  Param,
  Body,
  UsePipes,
  ValidationPipe,
  UseGuards,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
  BadRequestException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto, Pagination, UpdatePasswordDto, UpdateUserDto } from './dto/user.dto';
import { User } from './user.entity';
import { Response } from 'src/shared/response';
import { AuthGuard } from '@nestjs/passport';
import { CheckUserRoleMiddleware } from 'src/check-user-role/check-user-role.middleware';
import { SortType } from 'src/shared/enum';
import { request } from 'express';

@Controller('users')
@ApiBearerAuth('access-token')
@ApiTags('users')
export class UserController {
  constructor(private readonly userService: UserService) {}



  @Get()
  @ApiOperation({ summary: 'Find all users', description: 'Get a list of all users with optional pagination, sorting, and filtering.' })
  @ApiResponse({ status: 200, description: 'List of users.' })
  findAllUsers(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ) {
    return this.userService.findAllUsers(page, limit, );
  }

  @Get('getProfileUser')
  @UseGuards(AuthGuard()) 
  @ApiOperation({ summary: 'Get a user profile by token' })

  getProfileUser( @Request() request): Promise<User> {
    return this.userService.getProfileUser(request);
  }

  @Get(':id')
  @UseGuards(AuthGuard())
  @ApiOperation({ summary: 'Get a user by ID' })
  @ApiParam({ name: 'id', required: true  , description: 'User ID' , type: 'string' 
  , example: '6536448743a9f50c3e8c3075'})

  findUserById(@Param('id') id: string): Promise<User> {
    return this.userService.findUserById(id);
  }

  @Put('/:id')
  @UseGuards(AuthGuard())
  @ApiOperation({ summary: 'update user data by user id' })
  @ApiParam({ name: 'id', required: true  , description: 'User ID' , type: 'string' 
  , example: '6536448743a9f50c3e8c3075'})
  @ApiBody({ type: UpdateUserDto })
  @UsePipes(new ValidationPipe())
  updateUser(@Param('id') id: string, @Body() dto: UpdateUserDto): Promise<Response<User>> {
    return this.userService.updateUser(id, dto);
  };


  @Put('updatePassword/:id')
  @ApiOperation({ summary: 'Update Password', description: 'Update the current password to a new password.' })
  @ApiResponse({ status: 200, description: 'Password updated successfully.' })
  @ApiResponse({ status: 401, description: 'Failed to verify the current password.' })
  async updatePassword(
    @Param('id') id: string,    
    @Body() dto: UpdatePasswordDto
  ): Promise<Response<User>> {
    return this.userService.updatePassword(id, dto); 
  }
  

  @Delete('/:id')
  @UseGuards(AuthGuard())
  @ApiOperation({ summary: 'Delete a user by ID' })
  @ApiParam({ name: 'id', required: true  , description: 'User ID' , type: 'string'
  , example: '6536448743a9f50c3e8c3075'})
  deleteUser(@Param('id') id: string): Promise<Response<User>> {
    return this.userService.deleteUser(id);
  }


}
