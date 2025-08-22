import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, Query } from '@nestjs/common';
import { QuestionService } from './question.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { ApiOperation, ApiBody, ApiResponse, ApiParam } from '@nestjs/swagger';
import { Question } from './entities/question.entity';
import { QueryOptionsDto } from 'src/query-builder/dto/query-builder.dto';
import { PaginatedResult, QueryOptions } from 'src/query-builder/query-builder.service';

@Controller('questions')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Post()
  @ApiOperation({ summary: 'Create Question' })
  @ApiBody({type: CreateQuestionDto})
  @ApiResponse({ status: 201, description: 'Question Created',type:Question })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @UsePipes(ValidationPipe)
  async create(@Body() createQuestionDto: CreateQuestionDto) : Promise<Question> {
    return await this.questionService.create(createQuestionDto);
  }

  @Get()
  @ApiOperation({ summary: 'Find Questions' })
  @ApiResponse({ status: 200,type:[Question] })
  @UsePipes(ValidationPipe)
  async findAll(@Query() option: QueryOptionsDto) : Promise<PaginatedResult<Question>> {
    return await this.questionService.findAll(option as QueryOptions<Question>);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update Question' })
  @ApiBody({type: UpdateQuestionDto})
  @ApiResponse({ status: 201, description: 'Question Updated',type:Question })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @UsePipes(ValidationPipe)
  async update(@Param('id') id: string, @Body() updateQuestionDto: UpdateQuestionDto) : Promise<Question> {
    return await this.questionService.update(id, updateQuestionDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete Question' })
  @ApiParam({
    name: 'id',
    required: true,
    type: String,
  })
  @ApiResponse({ status: 200 })
  @UsePipes(ValidationPipe)
  async remove(@Param('id') id: string) : Promise<boolean> {
    return await this.questionService.remove(id);
  }
}
