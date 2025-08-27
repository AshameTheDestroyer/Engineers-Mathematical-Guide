import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsNumber } from "class-validator"
export class CompleteLessonDto {  
  @IsNotEmpty()
  @ApiProperty()
  @IsNumber()
  chapterNum: number
  
  @IsNotEmpty()
  @ApiProperty()
  @IsNumber()
  lessonNum: number
}