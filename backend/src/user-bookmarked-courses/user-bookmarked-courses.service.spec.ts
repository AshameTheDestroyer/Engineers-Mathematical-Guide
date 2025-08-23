import { Test, TestingModule } from '@nestjs/testing';
import { UserBookmarkedCoursesService } from './user-bookmarked-courses.service';

describe('UserBookmarkedCoursesService', () => {
  let service: UserBookmarkedCoursesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserBookmarkedCoursesService],
    }).compile();

    service = module.get<UserBookmarkedCoursesService>(UserBookmarkedCoursesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
