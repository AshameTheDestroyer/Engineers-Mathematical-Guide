import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, Query } from '@nestjs/common';
import { ChapterService } from './chapter.service';
import { CreateChapterDto } from './dto/create-chapter.dto';
import { UpdateChapterDto } from './dto/update-chapter.dto';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { Chapter } from './entities/chapter.entity';
import { QueryOptionsDto } from 'src/query-builder/dto/query-builder.dto';
import { PaginatedResult, QueryOptions } from 'src/query-builder/query-builder.service';

@Controller('chapters')
export class ChapterController {
  constructor(private readonly chapterService: ChapterService) {}

  @Post()
  @ApiOperation({ summary: 'Create Chapter' })
  @ApiBody({type: CreateChapterDto})
  @ApiResponse({ status: 201, description: 'Chapter Created',type:Chapter })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @UsePipes(ValidationPipe)
  async create(@Body() createChapterDto: CreateChapterDto) : Promise<Chapter> {
    return await this.chapterService.create(createChapterDto);
  }

  @Get()
  @ApiOperation({ summary: 'Find Chapters' })
  @ApiResponse({ status: 200,type:[Chapter] })
  @UsePipes(ValidationPipe)
  async findAll(@Query() option: QueryOptionsDto) : Promise<PaginatedResult<Chapter>> {
    return await this.chapterService.findAll(option as QueryOptions<Chapter>);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find Chapter' })
  @ApiParam({
    name: 'id',
    required: true,
    type: String,
  })
  @ApiResponse({ status: 200,type:Chapter })
  @ApiResponse({ status: 404,description:"NOT FOUND" })
  @UsePipes(ValidationPipe)
  async findOne(@Param('id') id: string) : Promise<Chapter> {
    return await this.chapterService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update Chapter' })
  @ApiBody({type: UpdateChapterDto})
  @ApiResponse({ status: 201, description: 'Chapter Updated',type:Chapter })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @UsePipes(ValidationPipe)
  async update(@Param('id') id: string, @Body() updateChapterDto: UpdateChapterDto) {
    return await this.chapterService.update(id, updateChapterDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete Chapter' })
  @ApiParam({
    name: 'id',
    required: true,
    type: String,
  })
  @ApiResponse({ status: 200 })
  @UsePipes(ValidationPipe)
  async remove(@Param('id') id: string) {
    return await this.chapterService.remove(id);
  }
}
