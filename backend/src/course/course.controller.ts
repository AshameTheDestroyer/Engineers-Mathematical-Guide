import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, Query, UseInterceptors, UploadedFile, Res } from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { PaginatedResult, QueryOptions } from 'src/query-builder/query-builder.service';
import { Course } from './entities/course.entity';
import { ApiBody, ApiConsumes, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { QueryOptionsDto } from 'src/query-builder/dto/query-builder.dto';
import { multerConfig } from 'src/config/multer.config';
import { FileInterceptor } from '@nestjs/platform-express';
import { join } from 'path';
import { Response } from 'express';
import { existsSync } from 'fs';

@Controller('courses')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}
  private readonly uploadsPath = join(process.cwd(), 'uploads');

  @Post()
  @ApiOperation({ summary: 'Create Course' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({type: CreateCourseDto})
  @ApiResponse({ status: 201, description: 'Course Created',type:Course })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @UsePipes(ValidationPipe)
  @UseInterceptors(FileInterceptor('image',multerConfig))
  async create(
    @Body() createCourseDto: CreateCourseDto,
    @UploadedFile() file: Express.Multer.File
  ) : Promise<Course> {
    const image = file?.filename || "";
    return await this.courseService.create({...createCourseDto,image});
  }

  @Get('images/:filename')
  @ApiOperation({ summary: 'Get Course\'s image' })
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

  @Get()
  @ApiOperation({ summary: 'Find Courses' })
  @ApiResponse({ status: 200,type:[Course] })
  @UsePipes(ValidationPipe)
  async findAll(@Query() option: QueryOptionsDto) : Promise<PaginatedResult<Course>> {
    return await this.courseService.findAll(option as QueryOptions<Course>);
  }
  
  @Get(':id')
  @ApiOperation({ summary: 'Find Course' })
  @ApiParam({
    name: 'id',
    required: true,
    type: String,
  })
  @ApiResponse({ status: 200,type:Course })
  @ApiResponse({ status: 404,description:"NOT FOUND" })
  @UsePipes(ValidationPipe)
  async findOne(@Param('id') id: string) : Promise<Course | null> {
    return await this.courseService.findOne(id);
  }
  
  @Patch(':id')
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Update Course' })
  @ApiParam({
    name: 'id',
    required: true,
    type: String,
  })
  @ApiBody({
    required: true,
    type: UpdateCourseDto
  })
  @ApiResponse({ status: 200,type:Course })
  @UsePipes(ValidationPipe)
  @UseInterceptors(FileInterceptor('image',multerConfig))
  async update(
    @Param('id') id: string,
    @Body() updateCourseDto: UpdateCourseDto,
    @UploadedFile() file: Express.Multer.File
  ) : Promise<Course | null> {
    const image = file.filename || "";
    return await this.courseService.update(id, {...updateCourseDto,image});
  }
  
  @Delete(':id')
  @ApiOperation({ summary: 'Delete Course' })
  @ApiParam({
    name: 'id',
    required: true,
    type: String,
  })
  @ApiResponse({ status: 200 })
  @UsePipes(ValidationPipe)
  async remove(@Param('id') id: string) : Promise<boolean> {
    return await this.courseService.remove(id);
  }
}
