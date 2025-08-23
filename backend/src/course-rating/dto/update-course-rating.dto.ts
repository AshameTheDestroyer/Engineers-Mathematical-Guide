import { PartialType } from '@nestjs/swagger';
import { CreateCourseRatingDto } from './create-course-rating.dto';

export class UpdateCourseRatingDto extends PartialType(CreateCourseRatingDto) {}
