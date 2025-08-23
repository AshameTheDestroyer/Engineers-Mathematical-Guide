import { Module } from '@nestjs/common';
import { FollowersService } from './followers.service';
import { FollowersController } from './followers.controller';
import { Follower } from './entities/follower.entity';
import { QueryBuilderModule } from 'src/query-builder/query-builder.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BaseModule } from 'src/base/base.module';
import { User } from 'src/user/entities/user.entity';
import { UserModule } from 'src/user/user.module';

@Module({
  controllers: [FollowersController],
  providers: [FollowersService],
  imports:[BaseModule.forFeature(Follower),TypeOrmModule.forFeature([Follower,User]), QueryBuilderModule.forFeature(Follower), UserModule]
})
export class FollowersModule {}
