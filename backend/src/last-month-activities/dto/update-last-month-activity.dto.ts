import { PartialType } from '@nestjs/swagger';
import { CreateLastMonthActivityDto } from './create-last-month-activity.dto';

export class UpdateLastMonthActivityDto extends PartialType(CreateLastMonthActivityDto) {}
