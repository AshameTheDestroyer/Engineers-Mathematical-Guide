import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, Query } from '@nestjs/common';
import { LessonService } from './lesson.service';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { ApiOperation, ApiBody, ApiResponse, ApiParam } from '@nestjs/swagger';
import { Lesson } from './entities/lesson.entity';
import { QueryOptionsDto } from 'src/query-builder/dto/query-builder.dto';
import { PaginatedResult, QueryOptions } from 'src/query-builder/query-builder.service';

@Controller('lessons')
export class LessonController {
  constructor(private readonly lessonService: LessonService) {}

  @Post()
  @ApiOperation({ summary: 'Create Lesson' })
  @ApiBody({type: CreateLessonDto})
  @ApiResponse({ status: 201, description: 'Lesson Created',type:Lesson })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @UsePipes(ValidationPipe)
  async create(@Body() createLessonDto: CreateLessonDto) : Promise<Lesson> {
    return await this.lessonService.create(createLessonDto);
  }

  @Get()
  @ApiOperation({ summary: 'Find Lessons' })
  @ApiResponse({ status: 200,type:[Lesson] })
  @UsePipes(ValidationPipe)
  async findAll(@Query() option: QueryOptionsDto) : Promise<PaginatedResult<Lesson>> {
    return await this.lessonService.findAll(option as QueryOptions<Lesson>);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find Lesson' })
  @ApiParam({
    name: 'id',
    required: true,
    type: String,
  })
  @ApiResponse({ status: 200,type:Lesson })
  @ApiResponse({ status: 404,description:"NOT FOUND" })
  @UsePipes(ValidationPipe)
  async findOne(@Param('id') id: string) : Promise<Lesson> {
    return await this.lessonService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update Lesson' })
  @ApiBody({type: UpdateLessonDto})
  @ApiResponse({ status: 201, description: 'Lesson Updated',type:Lesson })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @UsePipes(ValidationPipe)
  async update(@Param('id') id: string, @Body() updateLessonDto: UpdateLessonDto) : Promise<Lesson> {
    return await this.lessonService.update(id, updateLessonDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete Lesson' })
  @ApiParam({
    name: 'id',
    required: true,
    type: String,
  })
  @ApiResponse({ status: 200 })
  @UsePipes(ValidationPipe)
  async remove(@Param('id') id: string) : Promise<boolean> {
    return await this.lessonService.remove(id);
  }
}
