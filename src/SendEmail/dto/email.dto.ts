import { IsNotEmpty } from 'class-validator';

export class EmailDto {
  @IsNotEmpty()
  recipient: string;

  @IsNotEmpty()
  subject: string;

  @IsNotEmpty()
  text: string;

  @IsNotEmpty()
  otp: number;
}
