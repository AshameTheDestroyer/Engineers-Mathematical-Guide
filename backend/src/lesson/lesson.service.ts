import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base/base.service';
import { QueryBuilderService } from 'src/query-builder/query-builder.service';
import { MongoRepository } from 'typeorm';
import { Lesson } from './entities/lesson.entity';

@Injectable()
export class LessonService extends BaseService<Lesson> {
  constructor(
    @InjectRepository(Lesson) private lessonRepo: MongoRepository<Lesson>,
    private readonly lessonQueryBuilder: QueryBuilderService<Lesson>
  ) {
    super(lessonRepo,lessonQueryBuilder)
  }
}
