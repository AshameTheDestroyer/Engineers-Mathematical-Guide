import { Module, OnApplicationBootstrap, OnModuleInit } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { typeOrmConfig } from "./config/typeorm.config";
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from "@nestjs/config";
import { MailerModule } from './mailer/mailer.module';
import { UserEnrolledCoursesModule } from './user-enrolled-courses/user-enrolled-courses.module';
import { UserPassedCoursesModule } from './user-passed-courses/user-passed-courses.module';
import { UserBookmarkedCoursesModule } from './user-bookmarked-courses/user-bookmarked-courses.module';
import { CourseModule } from './course/course.module';
import { LessonModule } from './lesson/lesson.module';
import { QuestionModule } from './question/question.module';
import { FollowersModule } from './followers/followers.module';
import { CourseRatingModule } from './course-rating/course-rating.module';
import { TagsModule } from './tags/tags.module';
import { BaseModule } from './base/base.module';
import { CoursesTagsModule } from './courses-tags/courses-tags.module';
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";
import { ChapterModule } from './chapter/chapter.module';
import { MathEquationModule } from './math-equation/math-equation.module';
import { UserExamModule } from "./user-exam/user-exam.module";

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    ConfigModule.forRoot({ isGlobal:true }),
    AuthModule, 
    UserModule,
    MailerModule,
    UserEnrolledCoursesModule,
    UserPassedCoursesModule,
    UserBookmarkedCoursesModule,
    CourseModule,
    LessonModule,
    QuestionModule,
    FollowersModule,
    CourseRatingModule,
    TagsModule,
    BaseModule,
    CoursesTagsModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname,'..','uploads'),
    }),
    ChapterModule,
    MathEquationModule,
    UserExamModule,
  ],
})
export class AppModule implements OnModuleInit, OnApplicationBootstrap{
  onModuleInit() {
    console.log('app.module init');
  }
  onApplicationBootstrap() {
    console.log('app.module boot');
  }
}
