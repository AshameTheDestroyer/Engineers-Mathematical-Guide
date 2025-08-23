import { Controller, Get, Post, Body, Param, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserBookmarkedCoursesService } from './user-bookmarked-courses.service';
import { CreateUserBookmarkedCourseDto } from './dto/create-user-bookmarked-course.dto';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { UserBookmarkedCourse } from './entities/user-bookmarked-course.entity';
import { Course } from 'src/course/entities/course.entity';
import { ObjectId } from 'typeorm';

@Controller('user-bookmarked-courses')
export class UserBookmarkedCoursesController {
  constructor(private readonly userBookmarkedCoursesService: UserBookmarkedCoursesService) {}

  @Post()
  @ApiOperation({ summary: 'Create UserBookmarkedCourse' })
  @ApiBody({type: CreateUserBookmarkedCourseDto})
  @ApiResponse({ status: 201, description: 'UserBookmarkedCourse Created',type:UserBookmarkedCourse })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @UsePipes(ValidationPipe)
  async create(@Body() createUserBookmarkedCourseDto: CreateUserBookmarkedCourseDto) : Promise<UserBookmarkedCourse> {
    return await this.userBookmarkedCoursesService.create(createUserBookmarkedCourseDto);
  }
  
  @Get('user/:id')
  @ApiOperation({ summary: 'Find Bookmarked Courses For A User' })
  @ApiResponse({ status: 200,type:[UserBookmarkedCourse] })
  @UsePipes(ValidationPipe)
  async findAll(@Param('id') id: string) : Promise<{id:ObjectId,course:Course}[]> {
    return await this.userBookmarkedCoursesService.findForUser(id);
  }
  
  @Delete(':id')
  @ApiOperation({ summary: 'Delete UserBookmarkedCourse' })
  @ApiParam({
    name: 'id',
    required: true,
    type: String,
  })
  @ApiResponse({ status: 200 })
  @UsePipes(ValidationPipe)
  async remove(@Param('id') id: string) : Promise<boolean> {
    return await this.userBookmarkedCoursesService.remove(id);
  }
}
