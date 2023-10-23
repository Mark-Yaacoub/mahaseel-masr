import { Module } from '@nestjs/common';
import { SendEmailService } from './send-email.service';
import { SendEmailController } from './send-email.controller';

@Module({
  providers: [SendEmailService],
  controllers: [SendEmailController],
  exports: [SendEmailService]

})
export class SendEmailModule {}
