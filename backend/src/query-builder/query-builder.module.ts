import { DynamicModule, Module } from '@nestjs/common';
import { QueryBuilderService } from './query-builder.service';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { MongoRepository, ObjectLiteral } from 'typeorm';
@Module({})
export class QueryBuilderModule {
    static forFeature<T extends ObjectLiteral>(entity: new () => T): DynamicModule {
    return {
      module: QueryBuilderModule,
      imports: [TypeOrmModule.forFeature([entity])],
      providers: [
        {
          provide: QueryBuilderService,
          useFactory: (repository: MongoRepository<T>) => {
            return new QueryBuilderService<T>(repository);
          },
          inject: [getRepositoryToken(entity)],
        },
      ],
      exports: [QueryBuilderService],
    };
  }
}
