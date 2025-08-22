import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { Course } from './entities/course.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QueryBuilderModule } from 'src/query-builder/query-builder.module';
import { BaseModule } from 'src/base/base.module';

@Module({
  controllers: [CourseController],
  providers: [CourseService],
  imports:[BaseModule.forFeature(Course),TypeOrmModule.forFeature([Course]), QueryBuilderModule.forFeature(Course)],
  exports:[CourseService]
})
export class CourseModule {}
