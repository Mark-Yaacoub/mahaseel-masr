import { Controller, Post, Body } from '@nestjs/common';
import { SendEmailService } from './sendEmail.service';
import { EmailDto } from './dto/email.dto';

@Controller('email')
export class SendEmailController {
  constructor(private sendEmailService: SendEmailService) {}
 
  // @Post('/sendOtp')
  // async sendEmail(@Body() emailData: EmailDto): Promise<any> {
  //   try {
  //     const result = await this.sendEmailService.sendEmailOtp(emailData);
  //     return { success: true, message: 'Email sent successfully', data: result };
  //   } catch (error) {
  //     return { success: false, message: 'Error sending email', error: error.message };
  //   }
  // } 
}
