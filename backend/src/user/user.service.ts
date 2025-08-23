/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { MongoRepository } from 'typeorm';
import * as bcryptjs from 'bcryptjs';
import { ConfigService } from '@nestjs/config';
import { CreateUserDTO } from './dto/createUser.dto';
import { ObjectId } from 'mongodb';
import { join } from 'path';
import { existsSync, unlinkSync } from 'fs';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepo: MongoRepository<User>,
    private readonly configService: ConfigService,
  ) {}

  async findOneById(userId: ObjectId): Promise<User> {
    const user = await this.userRepo.findOne({
      where: { id: userId },
      select: { password: false, salt: false },
    });
    if (!user) throw new NotFoundException('There is No Id Like That');
    return user;
  }

  async findOneByEmail(
    email: string,
    password: string,
    verify: boolean,
  ): Promise<User> {
    const user = await this.userRepo.findOne({ where: { email } });
    if (!user)
      throw new NotFoundException('There is No Email Like That ' + email);
    if (!verify) return user;
    if (await user.validatePassword(password)) return user;
    throw new NotFoundException('There An Error With Email Or Password');
  }

  async updateUserPassword(userId: ObjectId, newPassword: string) {
    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('There is No Id Like That');

    // hash the new password with the existed salt
    const hashedPassword = await bcryptjs.hash(newPassword, user.salt);
    user.password = hashedPassword;
    await this.userRepo.save(user);
    return user;
  }

  async createUser(createUserDTO: CreateUserDTO): Promise<User> {
    try {
      const salt = await bcryptjs.genSalt(10);
      if(await this.userRepo.findOneBy({email:createUserDTO.email})) throw new ConflictException();
      const hashedPassword = await bcryptjs.hash(createUserDTO.password, salt);
      createUserDTO.password = hashedPassword;
      createUserDTO.salt = salt;
      const user = await this.userRepo.save(createUserDTO);
      return user;
    } catch (error: any) {
      Logger.warn(error);      
      if('response' in error) throw new ConflictException("The Email Used Before");
      throw new InternalServerErrorException();
    }
  }

  async deleteUser(userId: ObjectId) {
    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('There is no id like that');
    await this.userRepo.remove(user);
  }

  async updateFollowerCount(follower: string, followee: string, val: number) {
    try {
      await this.userRepo.updateOne({_id: new ObjectId(follower)},{$inc:{followersCount:val}});
      await this.userRepo.updateOne({_id: new ObjectId(followee)},{$inc:{followeeCount:val}});
    } catch (error) {
      Logger.warn(error);
      throw new InternalServerErrorException();
    }
  }

  private deleteFile(filePath: string): void {
    const fullPath = join(process.cwd(),'uploads', filePath);
    if (existsSync(fullPath)) {
      unlinkSync(fullPath);
    }
  }
}
