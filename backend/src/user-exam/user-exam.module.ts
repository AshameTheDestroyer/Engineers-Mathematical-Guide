import { Module } from '@nestjs/common';
import { UserExamService } from './user-exam.service';
import { UserExamController } from './user-exam.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BaseModule } from 'src/base/base.module';
import { QueryBuilderModule } from 'src/query-builder/query-builder.module';
import { UserExam } from './entities/user-exam.entity';
import { ChapterModule } from 'src/chapter/chapter.module';
import { User } from 'src/user/entities/user.entity';
import { QuestionModule } from 'src/question/question.module';
import { UserEnrolledCourse } from 'src/user-enrolled-courses/entities/user-enrolled-course.entity';
import { CourseModule } from 'src/course/course.module';
import { UserPassedCourse } from 'src/user-passed-courses/entities/user-passed-course.entity';

@Module({
  controllers: [UserExamController],
  providers: [UserExamService],
  imports:[BaseModule.forFeature(UserExam),TypeOrmModule.forFeature([UserExam,User,UserEnrolledCourse,UserPassedCourse]), QueryBuilderModule.forFeature(UserExam),ChapterModule,QuestionModule,CourseModule],
})
export class UserExamModule {}
