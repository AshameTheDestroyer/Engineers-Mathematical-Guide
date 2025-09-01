import { Test, TestingModule } from '@nestjs/testing';
import { UserExamService } from './user-exam.service';

describe('UserExamService', () => {
  let service: UserExamService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserExamService],
    }).compile();

    service = module.get<UserExamService>(UserExamService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
