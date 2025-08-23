import { Module } from '@nestjs/common';
import { LessonService } from './lesson.service';
import { LessonController } from './lesson.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BaseModule } from 'src/base/base.module';
import { QueryBuilderModule } from 'src/query-builder/query-builder.module';
import { Lesson } from './entities/lesson.entity';

@Module({
  controllers: [LessonController],
  providers: [LessonService],
  imports:[BaseModule.forFeature(Lesson),TypeOrmModule.forFeature([Lesson]), QueryBuilderModule.forFeature(Lesson)],
})
export class LessonModule {}
