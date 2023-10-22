

import { Module } from '@nestjs/common';
import { SendEmailService } from './sendemail.service';
import { SendEmailController } from './sendemail.controller';

@Module({
    imports: [],
    controllers: [SendEmailController],
    providers: [SendEmailService],
    exports: [SendEmailService],
})
export class SendEmailModule {}
      