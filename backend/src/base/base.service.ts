import { ConflictException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { DeepPartial, MongoRepository, ObjectLiteral } from 'typeorm';
import { PaginatedResult, QueryBuilderService, QueryOptions } from 'src/query-builder/query-builder.service';
import { ObjectId } from 'mongodb';

@Injectable()
export class BaseService<Repo extends ObjectLiteral> {
  constructor(
    private readonly repository: MongoRepository<Repo>,
    private readonly queryBuilder: QueryBuilderService<Repo>
  ) {}

  async create(createDto: DeepPartial<Repo>) : Promise<Repo> {
    try {
      const prevDoc = await this.repository.findOne({where:{createDto}});
      if(prevDoc) throw new ConflictException("The Document Has Been Inserted Before");
      return await this.repository.save(createDto);
    } catch(error) {
      Logger.warn(error);
      throw new ConflictException("The Document Has Been Inserted Before");
    }
  }

  async findAll(options?: QueryOptions<Repo>) : Promise<PaginatedResult<Repo>> {
    try {
      return await this.queryBuilder.buildQuery(options || {});
    } catch (error) {
      Logger.warn(error);
      throw new InternalServerErrorException();
    }
  }

  async findOne(id: string) : Promise<Repo> {
    try {
      const doc = await this.repository.findOneBy({_id: new ObjectId(id)});
      if(!doc) throw new ConflictException()
      return doc;
    } catch(error) {
      Logger.warn(error);
      throw new ConflictException('There is No Document')
    }
  }

  async update(id: string, updateDto: DeepPartial<Repo>) : Promise<Repo> {
    try {
      await this.repository.update(id,updateDto as any);
      return await this.findOne(id);
    } catch (error) {
      Logger.warn(error);
      throw new InternalServerErrorException();
    }
  }
  
  async remove(id: string) : Promise<boolean> {
    try {
      await this.findOne(id);
      if((await this.repository.findOneAndDelete({_id: new ObjectId(id)})) !== null)
        return true;
      throw new ConflictException()
    }
    catch(error) {
      Logger.warn(error);
      throw new ConflictException("There Is No Element")
    }
  }
}