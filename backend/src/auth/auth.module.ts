import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { MailerModule } from '../mailer/mailer.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [UserModule,ConfigModule,JwtModule.register({global:true}),
  MailerModule]
})
export class AuthModule {}
