import { Module, OnApplicationBootstrap, OnModuleInit } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { typeOrmConfig } from "./config/typeorm.config";
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from "@nestjs/config";
import { MailerModule } from './mailer/mailer.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    ConfigModule.forRoot({ isGlobal:true }),
    AuthModule, 
    UserModule,
    MailerModule
  ],
})
export class AppModule implements OnModuleInit, OnApplicationBootstrap{
  onModuleInit() {
    console.log('app.module init');
}
onApplicationBootstrap() {
    console.log('app.module boot');
  }
}
