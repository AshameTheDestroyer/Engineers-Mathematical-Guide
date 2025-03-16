import { Module } from '@nestjs/common';
import { MailerService } from './mailer.service';
import { MailerController } from './mailer.controller';

@Module({
  controllers: [MailerController],
  providers: [MailerService],
  exports: [MailerService],
})
export class MailerModule {}
