import { Test, TestingModule } from '@nestjs/testing';
import { UserBookmarkedCoursesController } from './user-bookmarked-courses.controller';
import { UserBookmarkedCoursesService } from './user-bookmarked-courses.service';

describe('UserBookmarkedCoursesController', () => {
  let controller: UserBookmarkedCoursesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserBookmarkedCoursesController],
      providers: [UserBookmarkedCoursesService],
    }).compile();

    controller = module.get<UserBookmarkedCoursesController>(UserBookmarkedCoursesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
