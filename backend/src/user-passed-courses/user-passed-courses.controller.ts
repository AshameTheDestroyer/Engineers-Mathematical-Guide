import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserPassedCoursesService } from './user-passed-courses.service';
import { CreateUserPassedCourseDto } from './dto/create-user-passed-course.dto';
import { UpdateUserPassedCourseDto } from './dto/update-user-passed-course.dto';

@Controller('user-passed-courses')
export class UserPassedCoursesController {
  constructor(private readonly userPassedCoursesService: UserPassedCoursesService) {}

  @Post()
  create(@Body() createUserPassedCourseDto: CreateUserPassedCourseDto) {
    return this.userPassedCoursesService.create(createUserPassedCourseDto);
  }

  @Get()
  findAll() {
    return this.userPassedCoursesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userPassedCoursesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserPassedCourseDto: UpdateUserPassedCourseDto) {
    return this.userPassedCoursesService.update(id, updateUserPassedCourseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userPassedCoursesService.remove(id);
  }
}
