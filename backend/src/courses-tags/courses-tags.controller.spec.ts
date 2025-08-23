import { Test, TestingModule } from '@nestjs/testing';
import { CoursesTagsController } from './courses-tags.controller';
import { CoursesTagsService } from './courses-tags.service';

describe('CoursesTagsController', () => {
  let controller: CoursesTagsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CoursesTagsController],
      providers: [CoursesTagsService],
    }).compile();

    controller = module.get<CoursesTagsController>(CoursesTagsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
