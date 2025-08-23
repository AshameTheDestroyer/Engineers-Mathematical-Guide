import { Test, TestingModule } from '@nestjs/testing';
import { UserPassedCoursesController } from './user-passed-courses.controller';
import { UserPassedCoursesService } from './user-passed-courses.service';

describe('UserPassedCoursesController', () => {
  let controller: UserPassedCoursesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserPassedCoursesController],
      providers: [UserPassedCoursesService],
    }).compile();

    controller = module.get<UserPassedCoursesController>(UserPassedCoursesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
