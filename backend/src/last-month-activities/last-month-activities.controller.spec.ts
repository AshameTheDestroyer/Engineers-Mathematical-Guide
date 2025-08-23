import { Test, TestingModule } from '@nestjs/testing';
import { LastMonthActivitiesController } from './last-month-activities.controller';
import { LastMonthActivitiesService } from './last-month-activities.service';

describe('LastMonthActivitiesController', () => {
  let controller: LastMonthActivitiesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LastMonthActivitiesController],
      providers: [LastMonthActivitiesService],
    }).compile();

    controller = module.get<LastMonthActivitiesController>(LastMonthActivitiesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
