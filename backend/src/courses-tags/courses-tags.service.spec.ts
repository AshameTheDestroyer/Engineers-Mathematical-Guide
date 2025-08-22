import { Test, TestingModule } from '@nestjs/testing';
import { CoursesTagsService } from './courses-tags.service';

describe('CoursesTagsService', () => {
  let service: CoursesTagsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CoursesTagsService],
    }).compile();

    service = module.get<CoursesTagsService>(CoursesTagsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
