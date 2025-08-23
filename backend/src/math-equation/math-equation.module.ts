import { Module } from '@nestjs/common';
import { MathEquationService } from './math-equation.service';
import { MathEquationController } from './math-equation.controller';
import { BaseModule } from 'src/base/base.module';
import { MathEquation } from './entities/math-equation.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QueryBuilderModule } from 'src/query-builder/query-builder.module';

@Module({
  controllers: [MathEquationController],
  providers: [MathEquationService],
  imports:[BaseModule.forFeature(MathEquation),TypeOrmModule.forFeature([MathEquation]), QueryBuilderModule.forFeature(MathEquation)],
})
export class MathEquationModule {}
