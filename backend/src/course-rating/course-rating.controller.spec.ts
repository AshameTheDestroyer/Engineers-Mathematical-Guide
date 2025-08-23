import { Test, TestingModule } from '@nestjs/testing';
import { CourseRatingController } from './course-rating.controller';
import { CourseRatingService } from './course-rating.service';

describe('CourseRatingController', () => {
  let controller: CourseRatingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CourseRatingController],
      providers: [CourseRatingService],
    }).compile();

    controller = module.get<CourseRatingController>(CourseRatingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
