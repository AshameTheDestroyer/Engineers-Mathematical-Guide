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

  XP: number = 0

  chapterNum: number = 1
  
  lessonNum: number = 1

  chapterId: string = ""
  
  lessonId: string = ""

  canDoExam: boolean = false

  lastStudied: Date = new Date()
}