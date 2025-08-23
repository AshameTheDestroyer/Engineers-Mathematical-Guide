import { Module } from '@nestjs/common';
import { CoursesTagsService } from './courses-tags.service';
import { CoursesTagsController } from './courses-tags.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BaseModule } from 'src/base/base.module';
import { QueryBuilderModule } from 'src/query-builder/query-builder.module';
import { CoursesTag } from './entities/courses-tag.entity';
import { Course } from 'src/course/entities/course.entity';
import { Tag } from 'src/tags/entities/tag.entity';
import { TagsModule } from 'src/tags/tags.module';

@Module({
  controllers: [CoursesTagsController],
  providers: [CoursesTagsService],
  imports:[BaseModule.forFeature(CoursesTag),TypeOrmModule.forFeature([CoursesTag,Course,Tag]), QueryBuilderModule.forFeature(CoursesTag),TagsModule],
})
export class CoursesTagsModule {}
