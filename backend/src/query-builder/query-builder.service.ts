import { Injectable } from '@nestjs/common';
import { ObjectId } from 'mongodb';
import { MongoRepository, ObjectLiteral } from 'typeorm';

export interface QueryOptions<T> {
  ids?: string[];
  fields?: (keyof T)[];
  page?: number;
  limit?: number;
  // relations?: string[]; // Simplified for MongoDB
}

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

@Injectable()
export class QueryBuilderService<T extends ObjectLiteral> {
  constructor(private readonly repository: MongoRepository<T>) { }

  async buildQuery(options: QueryOptions<T>): Promise<PaginatedResult<T>> {
    // Base query filter
    const filter: any = {};
    
    // ID filtering (MongoDB uses _id)
    if (options.ids && options.ids.length > 0) {
      const objectIds : ObjectId[] = [];
      for(const id of options.ids) objectIds.push(new ObjectId(id));
      filter._id = { $in: objectIds };
    }

    // Field selection (projection)
    const projection: any = [];
    if (options.fields && options.fields.length > 0) {
      options.fields.forEach(field => {
        projection.push(field as string);
      });
      // Always include _id
      projection.push(`_id`);
    }

    // For pagination
    const page = options.page || 1;
    const limit = options.limit || 10;
    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      this.repository.find({
        where: filter,
        select: projection,
        skip,
        take: limit,
        relations: ['user']
      }),
      this.repository.count(filter),
    ]);

    return {
      data,
      total,
      page: page,
      limit: limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  // For more complex queries, we can add aggregation support
  async buildAggregateQuery(pipeline: any[]): Promise<any[]> {
    return await this.repository.aggregate(pipeline).toArray();
  }
}