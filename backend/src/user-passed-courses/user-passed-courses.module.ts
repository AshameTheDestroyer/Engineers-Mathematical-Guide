import { Module } from '@nestjs/common';
import { UserPassedCoursesService } from './user-passed-courses.service';
import { UserPassedCoursesController } from './user-passed-courses.controller';
import { BaseModule } from 'src/base/base.module';
import { UserPassedCourse } from './entities/user-passed-course.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QueryBuilderModule } from 'src/query-builder/query-builder.module';

@Module({
  controllers: [UserPassedCoursesController],
  providers: [UserPassedCoursesService],
  imports:[BaseModule.forFeature(UserPassedCourse),TypeOrmModule.forFeature([UserPassedCourse]), QueryBuilderModule.forFeature(UserPassedCourse)],
})
export class UserPassedCoursesModule {}
