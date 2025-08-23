import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base/base.service';
import { QueryBuilderService } from 'src/query-builder/query-builder.service';
import { MongoRepository } from 'typeorm';
import { MathEquation } from './entities/math-equation.entity';

@Injectable()
export class MathEquationService extends BaseService<MathEquation> {
  constructor(
    @InjectRepository(MathEquation) private mathEquationRepo: MongoRepository<MathEquation>,
    private readonly mathEquationQueryBuilder: QueryBuilderService<MathEquation>
  ) {
    super(mathEquationRepo,mathEquationQueryBuilder)
  }
}
