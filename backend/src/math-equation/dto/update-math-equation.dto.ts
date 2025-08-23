import { PartialType } from '@nestjs/swagger';
import { CreateMathEquationDto } from './create-math-equation.dto';

export class UpdateMathEquationDto extends PartialType(CreateMathEquationDto) {}
