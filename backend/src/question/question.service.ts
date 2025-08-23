import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base/base.service';
import { QueryBuilderService } from 'src/query-builder/query-builder.service';
import { MongoRepository } from 'typeorm';
import { Question } from './entities/question.entity';

@Injectable()
export class QuestionService extends BaseService<Question> {
  constructor(
    @InjectRepository(Question) private questionRepo: MongoRepository<Question>,
    private readonly questionQueryBuilder: QueryBuilderService<Question>
  ) {
    super(questionRepo,questionQueryBuilder)
  }

}
