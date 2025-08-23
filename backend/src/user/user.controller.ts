import {
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthorizedGuard } from '../auth/guards/authorized.guard';
import { ObjectId } from 'typeorm';
import { AuthRequest } from 'src/utils/types';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { join } from 'path';
import { existsSync } from 'fs';
import { Response } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  private readonly uploadsPath = join(process.cwd(), 'uploads');

  @Get('profile')
  @UseGuards(AuthorizedGuard)
  async getMyProfile(@Req() request: AuthRequest) {
    const userId: ObjectId = request['userId'];
    return await this.userService.findOneById(userId);
  }

  @Get('images/:filename')
  @ApiOperation({ summary: 'Get User\'s image' })
  @ApiResponse({ status: 200, description: 'Image file' })
  async getProfileImage(
    @Param('filename') filename: string,
    @Res() res: Response
  ) {
    const filePath = join(this.uploadsPath, filename);
    if (!existsSync(filePath)) {
      return res.status(404).json({ message: 'Image not found' });
    }
    return res.sendFile(filePath);
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
