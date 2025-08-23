import { Injectable } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { BaseService } from 'src/base/base.service';
import { Tag } from './entities/tag.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { QueryBuilderService } from 'src/query-builder/query-builder.service';

@Injectable()
export class TagsService extends BaseService<Tag> {
  constructor(
    @InjectRepository(Tag) private tagRepo: MongoRepository<Tag>,
    private readonly tagQueryBuilder: QueryBuilderService<Tag>
  ) {
    super(tagRepo,tagQueryBuilder)
  }

  async changeTagCounter(tagId: string,val: number) {
    const tag : Tag = await this.findOne(tagId);
    const newCounter = tag.counter + val;
    await this.update(tagId,{counter: newCounter});
  }
}
