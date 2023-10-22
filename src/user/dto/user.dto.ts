import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, IsOptional, IsDate, MinLength, MaxLength, Matches, IsNumber } from 'class-validator';

export class CreateUserDto {

  @ApiProperty({ example: 'John' }) 
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ example: 'Doe' }) 
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ example: 'johnie' }) 
  @IsString()
  @IsNotEmpty()
  userName: string;

  @ApiProperty({ example: 'john.doe@example.com' }) 
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: '2000-01-01' }) 
  @IsDate()
  @IsNotEmpty()
  dateOfBirth: Date;

  @ApiProperty({ example: 'https://example.com/profile.jpg' }) 
  @IsOptional()
  profilePicture: string;

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

export class ReSendOtp {
  @IsEmail()
  @ApiProperty({ example: 'john.doe@example.com' }) 
  @IsNotEmpty()
  email: string;

}

export class verifyUserDto {
  @IsEmail()
  @ApiProperty({ example: 'john.doe@example.com' }) 
  @IsNotEmpty()
  email: string;

  @IsNumber()
  @ApiProperty({ example: '2526' }) 
  @IsNotEmpty()
  otp: number;
}
