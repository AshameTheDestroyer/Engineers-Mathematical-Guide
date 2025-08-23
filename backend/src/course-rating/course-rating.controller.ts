import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { CourseRatingService } from './course-rating.service';
import { CreateCourseRatingDto } from './dto/create-course-rating.dto';
import { UpdateCourseRatingDto } from './dto/update-course-rating.dto';
import { CourseService } from 'src/course/course.service';
import { CourseRating } from './entities/course-rating.entity';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { User } from 'src/user/entities/user.entity';
import { Course } from 'src/course/entities/course.entity';

@Controller('course-rating')
export class CourseRatingController {
  constructor(
    private readonly courseRatingService: CourseRatingService,
    private readonly courseService: CourseService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create CourseRating' })
  @ApiBody({type: CreateCourseRatingDto})
  @ApiResponse({ status: 201, description: 'Course Rating Created',type:CourseRating })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @UsePipes(ValidationPipe)
  async create(@Body() createCourseRatingDto: CreateCourseRatingDto) : Promise<CourseRating> {
    const doc = await this.courseRatingService.create(createCourseRatingDto);
    await this.courseService.addRating(createCourseRatingDto.courseId,createCourseRatingDto.rating);
    return doc;
  }

  @Get('to-course/:id')
  @ApiOperation({ summary: 'Find Course Ratings For A Course' })
  @ApiResponse({ status: 200 })
  @UsePipes(ValidationPipe)
  async findForCourse(@Param('id') id: string) : Promise<(CourseRating & {user: User})[]> {
    return await this.courseRatingService.findForCourse(id);
  }
  
  @Get('to-user/:id')
  @ApiOperation({ summary: 'Find Course Ratings For A User' })
  @ApiResponse({ status: 200 })
  @UsePipes(ValidationPipe)
  async findForUser(@Param('id') id: string) : Promise<(CourseRating & {course: Course})[]> {
    return await this.courseRatingService.findForUser(id);
  }
  
  @Get(':id')
  @ApiOperation({ summary: 'Find Course Rating' })
  @ApiResponse({ status: 200, type: CourseRating })
  @UsePipes(ValidationPipe)
  async findOne(@Param('id') id: string) : Promise<CourseRating> {
    return await this.courseRatingService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update CourseRating' })
  @ApiParam({
    name: 'id',
    required: true,
    type: String,
  })
  @ApiBody({
    required: true,
    type: UpdateCourseRatingDto
  })
  @ApiResponse({ status: 200,type:CourseRating })
  @UsePipes(ValidationPipe)
  async update(@Param('id') id: string, @Body() updateCourseRatingDto: UpdateCourseRatingDto) : Promise<CourseRating> {
    if(updateCourseRatingDto.rating) {
      const oldRating = await this.courseRatingService.findOne(id);
      await this.courseService.changeRating(oldRating.courseId,oldRating.rating,updateCourseRatingDto.rating);
    }
    return await this.courseRatingService.update(id, updateCourseRatingDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete CourseRating' })
  @ApiParam({
    name: 'id',
    required: true,
    type: String,
  })
  @ApiResponse({ status: 200 })
  @UsePipes(ValidationPipe)
  async remove(@Param('id') id: string) : Promise<boolean> {
    const rating = await this.courseRatingService.findOne(id);
    await this.courseService.deleteRating(rating.courseId,rating.rating);
    return await this.courseRatingService.remove(id);
  }
}
