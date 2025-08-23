import { Module } from '@nestjs/common';
import { LastMonthActivitiesService } from './last-month-activities.service';
import { LastMonthActivitiesController } from './last-month-activities.controller';

@Module({
  controllers: [LastMonthActivitiesController],
  providers: [LastMonthActivitiesService],
})
export class LastMonthActivitiesModule {}
