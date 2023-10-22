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

export class SendNewPaasword {

  @IsNotEmpty()

  recipient: string;
  @IsNotEmpty()

  password:string

}

export class sendEmailRestaurantUser {

  @IsNotEmpty()

  email: string;
  @IsNotEmpty()
  password:string

  Organization_name_en:string
  organizationId:number

  restaurant_name_en:string
  @IsNotEmpty()
  otp: number;
}