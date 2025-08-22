import { Test, TestingModule } from '@nestjs/testing';
import { BaseController } from './base.controller';
import { BaseService } from './base.service';

describe('BaseController', () => {
  let controller: BaseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BaseController],
      providers: [BaseService],
    }).compile();

    controller = module.get<BaseController>(BaseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
