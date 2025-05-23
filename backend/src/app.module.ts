import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./user/user.module";
import { MailerModule } from "./mailer/mailer.module";
import { typeOrmConfig } from "./config/typeorm.config";
import { Module, OnApplicationBootstrap, OnModuleInit } from "@nestjs/common";

@Module({
    imports: [
        TypeOrmModule.forRoot(typeOrmConfig),
        ConfigModule.forRoot({ isGlobal: true }),
        AuthModule,
        UserModule,
        MailerModule,
    ],
})
export class AppModule implements OnModuleInit, OnApplicationBootstrap {
    onModuleInit() {
        console.log("app.module has been initialized.");
    }

    onApplicationBootstrap() {
        console.log("app.module has booted.");
    }
}
