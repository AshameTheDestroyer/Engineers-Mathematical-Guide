import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthService } from "./auth.service";
import { ConfigModule } from "@nestjs/config";
import { UserModule } from "../user/user.module";
import { AuthController } from "./auth.controller";
import { MailerModule } from "../mailer/mailer.module";

@Module({
    controllers: [AuthController],
    providers: [AuthService],
    imports: [
        UserModule,
        ConfigModule,
        JwtModule.register({ global: true }),
        MailerModule,
    ],
})
export class AuthModule {}
