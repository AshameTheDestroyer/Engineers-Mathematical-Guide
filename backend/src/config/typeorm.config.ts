import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";

const configService = new ConfigService();

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: "mongodb",
    database: "Engineers-Mathematical-Guide",
    host: configService.get<string>("DATABASE_HOST"),
    port: configService.get<number>("DATABASE_PORT"),
    username: configService.get<string>("DATABASE_USER"),
    password: configService.get<string>("DATABASE_PASSWORD"),
    entities: [__dirname + "/../**/*.entity{.ts,.js}"],
};
