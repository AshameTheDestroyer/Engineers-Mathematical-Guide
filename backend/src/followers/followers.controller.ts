import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { FollowersService } from './followers.service';
import { CreateFollowerDto } from './dto/create-follower.dto';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { Follower } from './entities/follower.entity';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';
import { ObjectId } from 'typeorm';

@Controller('followers')
export class FollowersController {
  constructor(
    private readonly followersService: FollowersService,
    private readonly userService: UserService
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create Follower' })
  @ApiBody({type: CreateFollowerDto})
  @ApiResponse({ status: 201, description: 'Follower Created',type:Follower })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @UsePipes(ValidationPipe)
  async create(@Body() createFollowerDto: CreateFollowerDto) : Promise<Follower> {
    let doc = await this.followersService.create(createFollowerDto);
    await this.userService.updateFollowerCount(createFollowerDto.follower,createFollowerDto.followee,1);
    return doc;
  }
  
  @Get('to-user/:id')
  @ApiOperation({ summary: 'Find Followee' })
  @ApiParam({
    name: 'id',
    required: true,
    type: String,
  })
  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 404,description:"NOT FOUND" })
  @UsePipes(ValidationPipe)
  async findFollowee(@Param('id') id: string) : Promise<{id:ObjectId,followee:User}[]> {
    return await this.followersService.findFollowee(id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find Followers' })
  @ApiParam({
    name: 'id',
    required: true,
    type: String,
  })
  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 404,description:"NOT FOUND" })
  @UsePipes(ValidationPipe)
  async findFollowers(@Param('id') id: string) : Promise<{id:ObjectId,follower:User}[]> {
    return await this.followersService.findFollowers(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete Follower' })
  @ApiParam({
    name: 'id',
    required: true,
    type: String,
  })
  @ApiResponse({ status: 200 })
  @UsePipes(ValidationPipe)
  async remove(@Param('id') id: string) : Promise<boolean> {
    const followerInfo = await this.followersService.findOne(id);
    let result = await this.followersService.remove(id);
    await this.userService.updateFollowerCount(followerInfo.follower,followerInfo.followee,-1);
    return result;
  }
}
