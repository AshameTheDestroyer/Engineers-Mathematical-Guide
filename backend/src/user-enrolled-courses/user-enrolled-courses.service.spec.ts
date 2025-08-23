import { Test, TestingModule } from '@nestjs/testing';
import { UserEnrolledCoursesService } from './user-enrolled-courses.service';

describe('UserEnrolledCoursesService', () => {
  let service: UserEnrolledCoursesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserEnrolledCoursesService],
    }).compile();

    service = module.get<UserEnrolledCoursesService>(UserEnrolledCoursesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
