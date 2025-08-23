import { Test, TestingModule } from '@nestjs/testing';
import { LastMonthActivitiesService } from './last-month-activities.service';

describe('LastMonthActivitiesService', () => {
  let service: LastMonthActivitiesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LastMonthActivitiesService],
    }).compile();

    service = module.get<LastMonthActivitiesService>(LastMonthActivitiesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
