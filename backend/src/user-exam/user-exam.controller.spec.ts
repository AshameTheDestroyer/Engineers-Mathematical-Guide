import { Test, TestingModule } from '@nestjs/testing';
import { UserExamController } from './user-exam.controller';
import { UserExamService } from './user-exam.service';

describe('UserExamController', () => {
  let controller: UserExamController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserExamController],
      providers: [UserExamService],
    }).compile();

    controller = module.get<UserExamController>(UserExamController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
