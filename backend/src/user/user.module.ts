import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { User } from "./entities/user.entity";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserController } from "./user.controller";

@Module({
    controllers: [UserController],
    providers: [UserService],
    imports: [TypeOrmModule.forFeature([User]), ConfigModule],
    exports: [UserService],
})
export class UserModule {}
