import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
const configService: ConfigService = new ConfigService();

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mongodb',
  host: configService.get<string>('DATABASE_HOST'),
  port: configService.get<number>('DATABASE_PORT'),
  username: configService.get<string>('DATABASE_USER'),
  password: configService.get<string>('DATABASE_PASSWORD'),
  database: 'Mathware',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
};
