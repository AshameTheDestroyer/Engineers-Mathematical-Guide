import { Test, TestingModule } from '@nestjs/testing';
import { MathEquationService } from './math-equation.service';

describe('MathEquationService', () => {
  let service: MathEquationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MathEquationService],
    }).compile();

    service = module.get<MathEquationService>(MathEquationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
