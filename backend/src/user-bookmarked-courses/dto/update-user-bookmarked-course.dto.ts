import { PartialType } from '@nestjs/swagger';
import { CreateUserBookmarkedCourseDto } from './create-user-bookmarked-course.dto';

export class UpdateUserBookmarkedCourseDto extends PartialType(CreateUserBookmarkedCourseDto) {}
