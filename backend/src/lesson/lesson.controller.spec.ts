import { Test, TestingModule } from '@nestjs/testing';
import { LessonController } from './lesson.controller';
import { LessonService } from './lesson.service';

describe('LessonController', () => {
  let controller: LessonController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LessonController],
      providers: [LessonService],
    }).compile();

    controller = module.get<LessonController>(LessonController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
