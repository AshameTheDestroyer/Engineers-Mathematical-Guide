import { PartialType } from '@nestjs/swagger';
import { CreateUserPassedCourseDto } from './create-user-passed-course.dto';

export class UpdateUserPassedCourseDto extends PartialType(CreateUserPassedCourseDto) {}
