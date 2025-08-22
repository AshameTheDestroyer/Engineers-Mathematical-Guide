import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString } from "class-validator"

export class CreateUserBookmarkedCourseDto {
  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  userId: string
  
  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  courseId: string
}