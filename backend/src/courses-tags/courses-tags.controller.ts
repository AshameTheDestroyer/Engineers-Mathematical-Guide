import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { CoursesTagsService } from './courses-tags.service';
import { CreateCoursesTagDto } from './dto/create-courses-tag.dto';
import { ApiOperation, ApiBody, ApiResponse, ApiParam } from '@nestjs/swagger';
import { CoursesTag } from './entities/courses-tag.entity';
import { Course } from 'src/course/entities/course.entity';
import { Tag } from 'src/tags/entities/tag.entity';
import { TagsService } from 'src/tags/tags.service';

@Controller('courses-tags')
export class CoursesTagsController {
  constructor(
    private readonly coursesTagsService: CoursesTagsService,
    private readonly tagsService: TagsService
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create CoursesTag' })
  @ApiBody({type: CreateCoursesTagDto})
  @ApiResponse({ status: 201, description: 'CoursesTag Created',type:CoursesTag })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @UsePipes(ValidationPipe)
  async create(@Body() createCoursesTagDto: CreateCoursesTagDto) : Promise<CoursesTag> {
    await this.tagsService.changeTagCounter(createCoursesTagDto.tagId,1);
    return await this.coursesTagsService.create(createCoursesTagDto);
  }

  @Get('to-tag/:id')
  @ApiOperation({ summary: 'Find Courses For A Tag' })
  @ApiParam({
    name: 'id',
    required: true,
    type: String,
  })
  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 404,description:"NOT FOUND" })
  @UsePipes(ValidationPipe)
  async findForTag(@Param('id') id: string) : Promise<(CoursesTag&{course: Course})[]> {
    return await this.coursesTagsService.findForTag(id);
  }
  
  @Get('to-course/:id')
  @ApiOperation({ summary: 'Find Tags For A Course' })
  @ApiParam({
    name: 'id',
    required: true,
    type: String,
  })
  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 404,description:"NOT FOUND" })
  @UsePipes(ValidationPipe)
  async findForCourse(@Param('id') id: string) : Promise<(CoursesTag & {tag: Tag})[]> {
    return await this.coursesTagsService.findForCourse(id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find CourseTag' })
  @ApiParam({
    name: 'id',
    required: true,
    type: String,
  })
  @ApiResponse({ status: 200,type:CoursesTag })
  @ApiResponse({ status: 404,description:"NOT FOUND" })
  @UsePipes(ValidationPipe)
  async findOne(@Param('id') id: string) : Promise<CoursesTag> {
    return await this.coursesTagsService.findOne(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete CourseTag' })
  @ApiParam({
    name: 'id',
    required: true,
    type: String,
  })
  @ApiResponse({ status: 200 })
  @UsePipes(ValidationPipe)
  async remove(@Param('id') id: string) : Promise<boolean> {
    let tag = await this.coursesTagsService.findOne(id);
    await this.tagsService.changeTagCounter(tag.tagId,-1);
    return await this.coursesTagsService.remove(id);
  }
}
