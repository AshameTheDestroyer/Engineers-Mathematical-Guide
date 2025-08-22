import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, Query } from '@nestjs/common';
import { MathEquationService } from './math-equation.service';
import { CreateMathEquationDto } from './dto/create-math-equation.dto';
import { UpdateMathEquationDto } from './dto/update-math-equation.dto';
import { ApiOperation, ApiBody, ApiResponse, ApiParam } from '@nestjs/swagger';
import { CreateChapterDto } from 'src/chapter/dto/create-chapter.dto';
import { Chapter } from 'src/chapter/entities/chapter.entity';
import { MathEquation } from './entities/math-equation.entity';
import { PaginatedResult, QueryOptions } from 'src/query-builder/query-builder.service';
import { QueryOptionsDto } from 'src/query-builder/dto/query-builder.dto';

@Controller('math-equations')
export class MathEquationController {
  constructor(private readonly mathEquationService: MathEquationService) {}

  @Post()
  @ApiOperation({ summary: 'Create MathEquation' })
  @ApiBody({type: CreateMathEquationDto})
  @ApiResponse({ status: 201, description: 'MathEquation Created',type:MathEquation })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @UsePipes(ValidationPipe)
  async create(@Body() createMathEquationDto: CreateMathEquationDto) : Promise<MathEquation> {
    return await this.mathEquationService.create(createMathEquationDto);
  }

  @Get()
  @ApiOperation({ summary: 'Find MathEquations' })
  @ApiResponse({ status: 200,type:[MathEquation] })
  @UsePipes(ValidationPipe)
  async findAll(@Query() option: QueryOptionsDto) : Promise<PaginatedResult<MathEquation>> {
    return await this.mathEquationService.findAll(option as QueryOptions<MathEquation>);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find MathEquation' })
  @ApiParam({
    name: 'id',
    required: true,
    type: String,
  })
  @ApiResponse({ status: 200,type:MathEquation })
  @ApiResponse({ status: 404,description:"NOT FOUND" })
  @UsePipes(ValidationPipe)
  async findOne(@Param('id') id: string) : Promise<MathEquation> {
    return await this.mathEquationService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update MathEquation' })
  @ApiBody({type: UpdateMathEquationDto})
  @ApiResponse({ status: 201, description: 'MathEquation Updated',type:Chapter })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @UsePipes(ValidationPipe)
  async update(@Param('id') id: string, @Body() updateMathEquationDto: UpdateMathEquationDto) : Promise<MathEquation> {
    return await this.mathEquationService.update(id, updateMathEquationDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete MathEquation' })
  @ApiParam({
    name: 'id',
    required: true,
    type: String,
  })
  @ApiResponse({ status: 200 })
  @UsePipes(ValidationPipe)
  async remove(@Param('id') id: string) : Promise<boolean> {
    return await this.mathEquationService.remove(id);
  }
}
