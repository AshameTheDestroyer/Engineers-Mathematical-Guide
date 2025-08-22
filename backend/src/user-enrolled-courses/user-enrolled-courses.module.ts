import { Module } from '@nestjs/common';
import { UserEnrolledCoursesService } from './user-enrolled-courses.service';
import { UserEnrolledCoursesController } from './user-enrolled-courses.controller';
import { CourseModule } from 'src/course/course.module';
import { UserEnrolledCourse } from './entities/user-enrolled-course.entity';
import { BaseModule } from 'src/base/base.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QueryBuilderModule } from 'src/query-builder/query-builder.module';

@Module({
  controllers: [UserEnrolledCoursesController],
  providers: [UserEnrolledCoursesService],
  imports:[BaseModule.forFeature(UserEnrolledCourse),TypeOrmModule.forFeature([UserEnrolledCourse]), QueryBuilderModule.forFeature(UserEnrolledCourse),CourseModule]
})
export class UserEnrolledCoursesModule {}
