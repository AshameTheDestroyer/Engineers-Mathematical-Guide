import { DynamicModule, Module } from '@nestjs/common';
import { BaseService } from './base.service';
import { MongoRepository, ObjectLiteral } from 'typeorm';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { QueryBuilderModule } from 'src/query-builder/query-builder.module';
import { QueryBuilderService } from 'src/query-builder/query-builder.service';

@Module({})
export class BaseModule {
    static forFeature<T extends ObjectLiteral>(entity: new () => T): DynamicModule {
    return {
      module: BaseModule,
      imports: [TypeOrmModule.forFeature([entity]),QueryBuilderModule],
      providers: [
        {
          provide: BaseService,
          useFactory: (repository: MongoRepository<T>, queryBuilder: QueryBuilderService<T>) => {
            return new BaseService<T>(repository,queryBuilder);
          },
          inject: [getRepositoryToken(entity)],
        },
      ],
      exports: [BaseService],
    };
  }
}
