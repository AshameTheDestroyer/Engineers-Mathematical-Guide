import { Controller, Get, Post, Body, Param, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserEnrolledCoursesService } from './user-enrolled-courses.service';
import { CreateUserEnrolledCourseDto } from './dto/create-user-enrolled-course.dto';
import { UserEnrolledCourse } from './entities/user-enrolled-course.entity';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { Course } from 'src/course/entities/course.entity';
import { CourseService } from 'src/course/course.service';
import { CompleteLessonDto } from './dto/complete-lesson.dto';

@Controller('user-enrolled-courses')
export class UserEnrolledCoursesController {
  constructor(
    private readonly userEnrolledCoursesService: UserEnrolledCoursesService,
    private readonly courseService: CourseService
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create UserEnrolledCourse' })
  @ApiBody({type: CreateUserEnrolledCourseDto})
  @ApiResponse({ status: 201, description: 'UserEnrolledCourse Created',type:UserEnrolledCourse })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @UsePipes(ValidationPipe)
  async create(@Body() createUserEnrolledCourseDto: CreateUserEnrolledCourseDto) : Promise<UserEnrolledCourse> {
    let result: UserEnrolledCourse = await this.userEnrolledCoursesService.create(createUserEnrolledCourseDto);
    await this.courseService.increaseEnrollmentCount(createUserEnrolledCourseDto.courseId);
    return result;
  }

  @Post('complete-lesson/:id')
  @ApiOperation({ summary: 'Mark The Lesson As Completed' })
  @ApiOperation({ summary: 'Find Enrolled Courses For A User' })
  @ApiBody({type: CompleteLessonDto})
  @ApiResponse({ status: 201, description: 'UserEnrolledCourse Created',type:UserEnrolledCourse })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @UsePipes(ValidationPipe)
  async completeLesson(@Param('id') id: string, @Body() completeLessonDto: CompleteLessonDto) : Promise<UserEnrolledCourse> {
    return await this.userEnrolledCoursesService.completeLesson(id,completeLessonDto);
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Find Enrolled Courses For A User' })
  @ApiResponse({ status: 200,type:[UserEnrolledCourse] })
  @UsePipes(ValidationPipe)
  async findAll(@Param('userId') id: string) : Promise<(Partial<UserEnrolledCourse>&{course:Course}[])> {
    return await this.userEnrolledCoursesService.findForUser(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete UserEnrolledCourse' })
  @ApiParam({
    name: 'id',
    required: true,
    type: String,
  })
  @ApiResponse({ status: 200 })
  @UsePipes(ValidationPipe)
  async remove(@Param('id') id: string) {
    return this.userEnrolledCoursesService.remove(id);
  }
}
