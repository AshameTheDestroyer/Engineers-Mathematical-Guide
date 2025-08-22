import { Injectable } from '@nestjs/common';
import { CreateLastMonthActivityDto } from './dto/create-last-month-activity.dto';
import { UpdateLastMonthActivityDto } from './dto/update-last-month-activity.dto';

@Injectable()
export class LastMonthActivitiesService {
  create(createLastMonthActivityDto: CreateLastMonthActivityDto) {
    return 'This action adds a new lastMonthActivity';
  }

  findAll() {
    return `This action returns all lastMonthActivities`;
  }

  findOne(id: number) {
    return `This action returns a #${id} lastMonthActivity`;
  }

  update(id: number, updateLastMonthActivityDto: UpdateLastMonthActivityDto) {
    return `This action updates a #${id} lastMonthActivity`;
  }

  remove(id: number) {
    return `This action removes a #${id} lastMonthActivity`;
  }
}
