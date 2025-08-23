import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { QueryBuilderService } from 'src/query-builder/query-builder.service';
import { Chapter } from './entities/chapter.entity';
import { BaseService } from 'src/base/base.service';

@Injectable()
export class ChapterService extends BaseService<Chapter> {
  constructor(
    @InjectRepository(Chapter) private chapterRepo: MongoRepository<Chapter>,
    private readonly chapterQueryBuilder: QueryBuilderService<Chapter>
  ) {
    super(chapterRepo,chapterQueryBuilder)
  }
}
