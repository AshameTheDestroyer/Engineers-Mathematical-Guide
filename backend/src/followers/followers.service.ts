import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/base/base.service';
import { Follower } from './entities/follower.entity';
import { MongoRepository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryBuilderService } from 'src/query-builder/query-builder.service';
import { User } from 'src/user/entities/user.entity';
import { ObjectId } from 'mongodb';

@Injectable()
export class FollowersService extends BaseService<Follower> {
  constructor(
    @InjectRepository(Follower) private followerRepo: MongoRepository<Follower>,
    @InjectRepository(User) private userRepo: MongoRepository<User>,
    private readonly followerQueryBuilder: QueryBuilderService<Follower>
  ) {
    super(followerRepo,followerQueryBuilder)
  }

  async findFollowee(id : string) : Promise<{id:ObjectId,followee:User}[]> {
    const followeeInfo : Follower[] = await this.followerRepo.find({where:{followee:id}});
    const result : {id:ObjectId,followee:User}[] = [];
    for(const followee of followeeInfo) {
      const doc = await this.userRepo.find({where:{_id:new ObjectId(followee.follower)},select:['image','name','username','country','surname','id','streak']});
      result.push({id:followee.id,followee:doc[0]});
    }
    return result;
  }
  
  async findFollowers(id : string) : Promise<{id:ObjectId,follower:User}[]> {
    const followerInfo : Follower[] = await this.followerRepo.find({where:{follower:id}});
    const result : {id:ObjectId,follower:User}[] = [];
    for(const follower of followerInfo) {
      const doc = await this.userRepo.find({where:{_id:new ObjectId(follower.followee)},select:['image','name','username','country','surname','id','streak']});
      result.push({id:follower.id,follower:doc[0]});
    }
    return result;
  }
}
