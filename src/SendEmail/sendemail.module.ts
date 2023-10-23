

import { Module } from '@nestjs/common';
import { SendEmailService } from './sendEmail.service';
import { SendEmailController } from './sendEmail.controller';

@Module({
    imports: [],
    controllers: [SendEmailController],
    providers: [SendEmailService],
    exports: [SendEmailService],
})
export class SendEmailModule {}
      