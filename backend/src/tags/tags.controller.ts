import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, Query } from '@nestjs/common';
import { TagsService } from './tags.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { ApiOperation, ApiBody, ApiResponse, ApiParam } from '@nestjs/swagger';
import { Tag } from './entities/tag.entity';
import { QueryOptionsDto } from 'src/query-builder/dto/query-builder.dto';
import { PaginatedResult, QueryOptions } from 'src/query-builder/query-builder.service';

@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Post()
  @ApiOperation({ summary: 'Create Tag' })
  @ApiBody({type: CreateTagDto})
  @ApiResponse({ status: 201, description: 'Tag Created',type:Tag })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @UsePipes(ValidationPipe)
  async create(@Body() createTagDto: CreateTagDto) : Promise<Tag> {
    return await this.tagsService.create(createTagDto);
  }

  @Get()
  @ApiOperation({ summary: 'Find Tags' })
  @ApiResponse({ status: 200,type:[Tag] })
  @UsePipes(ValidationPipe)
  async findAll(@Query() option: QueryOptionsDto) : Promise<PaginatedResult<Tag>> {
    return await this.tagsService.findAll(option as QueryOptions<Tag>);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find Tag' })
  @ApiParam({
    name: 'id',
    required: true,
    type: String,
  })
  @ApiResponse({ status: 200,type:Tag })
  @ApiResponse({ status: 404,description:"NOT FOUND" })
  @UsePipes(ValidationPipe)
  async findOne(@Param('id') id: string) : Promise<Tag> {
    return await this.tagsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update Tag' })
  @ApiParam({
    name: 'id',
    required: true,
    type: String,
  })
  @ApiBody({
    required: true,
    type: UpdateTagDto
  })
  @ApiResponse({ status: 200,type:Tag })
  @UsePipes(ValidationPipe)
  async update(@Param('id') id: string, @Body() updateTagDto: UpdateTagDto) : Promise<Tag> {
    return await this.tagsService.update(id, updateTagDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete Tag' })
  @ApiParam({
    name: 'id',
    required: true,
    type: String,
  })
  @ApiResponse({ status: 200 })
  async remove(@Param('id') id: string) : Promise<boolean> {
    return await this.tagsService.remove(id);
  }
}
