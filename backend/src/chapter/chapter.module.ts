import { Module } from '@nestjs/common';
import { ChapterService } from './chapter.service';
import { ChapterController } from './chapter.controller';
import { BaseModule } from 'src/base/base.module';
import { Chapter } from './entities/chapter.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QueryBuilderModule } from 'src/query-builder/query-builder.module';

@Module({
  controllers: [ChapterController],
  providers: [ChapterService],
  imports:[BaseModule.forFeature(Chapter),TypeOrmModule.forFeature([Chapter]), QueryBuilderModule.forFeature(Chapter)],
  exports: [ChapterService]
})
export class ChapterModule {}
