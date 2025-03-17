import {
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthorizedGuard } from '../auth/guards/authorized.guard';
import { ObjectId } from 'typeorm';
import { AuthRequest } from 'src/utils/types';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('profile')
  @UseGuards(AuthorizedGuard)
  async getMyProfile(@Req() request: AuthRequest) {
    const userId: ObjectId = request['userId'];
    return await this.userService.findOneById(userId);
  }

  @Get(':userId')
  async findOne(@Param('userId') userId: ObjectId) {
    return await this.userService.findOneById(userId);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) userId: ObjectId) {
    return await this.userService.deleteUser(userId);
  }
}
