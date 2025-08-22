import { PartialType } from '@nestjs/swagger';
import { CreateCoursesTagDto } from './create-courses-tag.dto';

export class UpdateCoursesTagDto extends PartialType(CreateCoursesTagDto) {}
