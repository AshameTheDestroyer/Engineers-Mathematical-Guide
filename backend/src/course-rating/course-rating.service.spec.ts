import { Test, TestingModule } from '@nestjs/testing';
import { CourseRatingService } from './course-rating.service';

describe('CourseRatingService', () => {
  let service: CourseRatingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CourseRatingService],
    }).compile();

    service = module.get<CourseRatingService>(CourseRatingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
