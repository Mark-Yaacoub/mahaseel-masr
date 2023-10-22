import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, IsOptional, IsDate, MinLength, MaxLength, Matches } from 'class-validator';

export class CreateUserDto {

  @ApiProperty({ example: 'John' }) 
  @IsString()
  @IsNotEmpty()
  first_name: string;

  @ApiProperty({ example: 'Doe' }) 
  @IsString()
  @IsNotEmpty()
  last_name: string;

  @ApiProperty({ example: 'johnie' }) 
  @IsString()
  @IsOptional()
  username: string;

  @ApiProperty({ example: 'john.doe@example.com' }) 
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: '2000-01-01' }) 
  @IsDate()
  @IsNotEmpty()
  Date_of_birth: Date;

  @ApiProperty({ example: 'https://example.com/profile.jpg' }) 
  @IsOptional()
  profile_picture: string;

  @IsNotEmpty()
  @ApiProperty({ example: 'Mm@12345' }) 
  @MinLength(8)
  @MaxLength(20, {
    message:
      'Please Use Strong Password with a maximum length of 20 characters.',
  })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Please Use Strong Password.',
  })
  password: string;
}

export class LoginDto {
  @IsEmail()
  @ApiProperty({ example: 'john.doe@example.com' }) 
  @IsNotEmpty()
  email: string;

  @IsString()
  @ApiProperty({ example: 'Mm@12345' }) 
  @IsNotEmpty()
  password: string;
}
