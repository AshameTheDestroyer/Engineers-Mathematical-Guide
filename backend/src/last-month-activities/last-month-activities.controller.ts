import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LastMonthActivitiesService } from './last-month-activities.service';
import { CreateLastMonthActivityDto } from './dto/create-last-month-activity.dto';
import { UpdateLastMonthActivityDto } from './dto/update-last-month-activity.dto';

@Controller('last-month-activities')
export class LastMonthActivitiesController {
  constructor(private readonly lastMonthActivitiesService: LastMonthActivitiesService) {}

  @Post()
  create(@Body() createLastMonthActivityDto: CreateLastMonthActivityDto) {
    return this.lastMonthActivitiesService.create(createLastMonthActivityDto);
  }

  @Get()
  findAll() {
    return this.lastMonthActivitiesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lastMonthActivitiesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLastMonthActivityDto: UpdateLastMonthActivityDto) {
    return this.lastMonthActivitiesService.update(+id, updateLastMonthActivityDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lastMonthActivitiesService.remove(+id);
  }
}
