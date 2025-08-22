import { Module } from '@nestjs/common';
import { CourseRatingService } from './course-rating.service';
import { CourseRatingController } from './course-rating.controller';
import { BaseModule } from 'src/base/base.module';
import { CourseRating } from './entities/course-rating.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QueryBuilderModule } from 'src/query-builder/query-builder.module';
import { CourseModule } from 'src/course/course.module';
import { User } from 'src/user/entities/user.entity';
import { Course } from 'src/course/entities/course.entity';

@Module({
  controllers: [CourseRatingController],
  providers: [CourseRatingService],
  imports:[BaseModule.forFeature(CourseRating),TypeOrmModule.forFeature([CourseRating,User,Course]), QueryBuilderModule.forFeature(CourseRating),CourseModule]
})
export class CourseRatingModule {}
