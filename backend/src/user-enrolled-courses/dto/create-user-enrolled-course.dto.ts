import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString } from "class-validator"
export class CreateUserEnrolledCourseDto {
  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  userId: string;
  
  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  courseId: string

  moduleNum: number = 1
  
  lessonNum: number = 1
  
  progress: number = 0

  lastStudied: Date = new Date()
}