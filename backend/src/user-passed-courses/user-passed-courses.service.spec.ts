import { Test, TestingModule } from '@nestjs/testing';
import { UserPassedCoursesService } from './user-passed-courses.service';

describe('UserPassedCoursesService', () => {
  let service: UserPassedCoursesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserPassedCoursesService],
    }).compile();

    service = module.get<UserPassedCoursesService>(UserPassedCoursesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
