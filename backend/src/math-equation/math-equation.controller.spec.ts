import { Test, TestingModule } from '@nestjs/testing';
import { MathEquationController } from './math-equation.controller';
import { MathEquationService } from './math-equation.service';

describe('MathEquationController', () => {
  let controller: MathEquationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MathEquationController],
      providers: [MathEquationService],
    }).compile();

    controller = module.get<MathEquationController>(MathEquationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
