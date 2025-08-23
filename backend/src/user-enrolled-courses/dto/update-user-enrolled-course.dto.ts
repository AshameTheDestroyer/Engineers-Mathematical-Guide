import { PartialType } from '@nestjs/swagger';
import { CreateUserEnrolledCourseDto } from './create-user-enrolled-course.dto';

export class UpdateUserEnrolledCourseDto extends PartialType(CreateUserEnrolledCourseDto) {}
