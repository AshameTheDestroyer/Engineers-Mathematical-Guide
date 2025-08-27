import { Module } from '@nestjs/common';
import { QuestionService } from './question.service';
import { QuestionController } from './question.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BaseModule } from 'src/base/base.module';
import { QueryBuilderModule } from 'src/query-builder/query-builder.module';
import { Question } from './entities/question.entity';

@Module({
  controllers: [QuestionController],
  providers: [QuestionService],
  imports:[BaseModule.forFeature(Question),TypeOrmModule.forFeature([Question]), QueryBuilderModule.forFeature(Question)],
  exports: [QuestionService]
})
export class QuestionModule {}
