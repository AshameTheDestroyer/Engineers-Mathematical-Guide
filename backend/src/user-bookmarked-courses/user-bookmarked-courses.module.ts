import { Module } from '@nestjs/common';
import { UserBookmarkedCoursesService } from './user-bookmarked-courses.service';
import { UserBookmarkedCoursesController } from './user-bookmarked-courses.controller';
import { BaseModule } from 'src/base/base.module';
import { UserBookmarkedCourse } from './entities/user-bookmarked-course.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QueryBuilderModule } from 'src/query-builder/query-builder.module';
import { CourseModule } from 'src/course/course.module';

@Module({
  controllers: [UserBookmarkedCoursesController],
  providers: [UserBookmarkedCoursesService],
  imports:[BaseModule.forFeature(UserBookmarkedCourse),TypeOrmModule.forFeature([UserBookmarkedCourse]), QueryBuilderModule.forFeature(UserBookmarkedCourse),CourseModule]
})
export class UserBookmarkedCoursesModule {}
