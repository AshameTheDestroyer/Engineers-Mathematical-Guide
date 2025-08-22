import { Test, TestingModule } from '@nestjs/testing';
import { UserEnrolledCoursesController } from './user-enrolled-courses.controller';
import { UserEnrolledCoursesService } from './user-enrolled-courses.service';

describe('UserEnrolledCoursesController', () => {
  let controller: UserEnrolledCoursesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserEnrolledCoursesController],
      providers: [UserEnrolledCoursesService],
    }).compile();

    controller = module.get<UserEnrolledCoursesController>(UserEnrolledCoursesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
