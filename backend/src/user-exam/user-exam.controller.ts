import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, Query } from '@nestjs/common';
import { UserExamService } from './user-exam.service';
import { CreateUserExamDto } from './dto/create-user-exam.dto';
import { ApiOperation, ApiBody, ApiResponse, ApiParam } from '@nestjs/swagger';
import { UserExam } from './entities/user-exam.entity';
import { QueryOptionsDto } from 'src/query-builder/dto/query-builder.dto';
import { PaginatedResult, QueryOptions } from 'src/query-builder/query-builder.service';
import { FinishExamDto } from './dto/finish-exam.dto';

@Controller('user-exams')
export class UserExamController {
  constructor(
    private readonly userExamService: UserExamService,
  ) {}

  @Post('start')
  @ApiOperation({ summary: 'Create UserExam' })
  @ApiBody({type: CreateUserExamDto})
  @ApiResponse({ status: 201, description: 'UserExam Created',type:UserExam })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @UsePipes(ValidationPipe)
  async create(@Body() createUserExamDto: CreateUserExamDto) : Promise<UserExam> {
    return await this.userExamService.create(createUserExamDto);
  }

  @Post('finish/:examId')
  @ApiOperation({ summary: 'Finish User Exam' })
  @ApiParam({
    name: 'examId',
    required: true,
    type: String,
  })
  @ApiResponse({ status: 200,type:UserExam })
  @ApiResponse({ status: 404,description:"NOT FOUND" })
  @UsePipes(ValidationPipe)
  async finishExam(@Param('examId') examId: string,@Body() finishExamDto: FinishExamDto) : Promise<(UserExam&FinishExamDto)> {
    return await this.userExamService.finishExam(examId,finishExamDto);
  }

  @Get('to-user/:userId')
  @ApiOperation({ summary: 'Find Exams for User' })
  @ApiParam({
    name: 'userId',
    required: true,
    type: String,
  })
  @ApiResponse({ status: 200,type:UserExam })
  @UsePipes(ValidationPipe)
  async findExamsForUser(@Param('userId') userId: string) : Promise<UserExam[]> {
    return await this.userExamService.findExamsForUser(userId);
  }

  @Get()
  @ApiOperation({ summary: 'Find UserExams' })
  @ApiResponse({ status: 200,type:[UserExam] })
  @UsePipes(ValidationPipe)
  async findAll(@Query() option: QueryOptionsDto) : Promise<PaginatedResult<UserExam>> {
    return await this.userExamService.findAll(option as QueryOptions<UserExam>);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find UserExam' })
  @ApiParam({
    name: 'id',
    required: true,
    type: String,
  })
  @ApiResponse({ status: 200,type:UserExam })
  @ApiResponse({ status: 404,description:"NOT FOUND" })
  @UsePipes(ValidationPipe)
  async findOne(@Param('id') id: string) : Promise<UserExam> {
    return await this.userExamService.findOne(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete UserExam' })
  @ApiParam({
    name: 'id',
    required: true,
    type: String,
  })
  @ApiResponse({ status: 200 })
  @UsePipes(ValidationPipe)
  async remove(@Param('id') id: string) : Promise<boolean> {
    return await this.userExamService.remove(id);
  }
}
