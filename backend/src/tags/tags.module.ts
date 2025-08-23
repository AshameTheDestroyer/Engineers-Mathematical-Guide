import { Module } from '@nestjs/common';
import { TagsService } from './tags.service';
import { TagsController } from './tags.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BaseModule } from 'src/base/base.module';
import { QueryBuilderModule } from 'src/query-builder/query-builder.module';
import { Tag } from './entities/tag.entity';

@Module({
  controllers: [TagsController],
  providers: [TagsService],
  imports:[BaseModule.forFeature(Tag),TypeOrmModule.forFeature([Tag]), QueryBuilderModule.forFeature(Tag)],
  exports:[TagsService]
})
export class TagsModule {}
