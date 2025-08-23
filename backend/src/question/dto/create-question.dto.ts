import { ApiProperty } from "@nestjs/swagger"
import { IsArray, IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateQuestionDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    question: string
    
    @IsNotEmpty()
    @IsArray()
    @ApiProperty()
    options: string[]
    
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    answer: string
    
    @IsNotEmpty()
    @IsNumber()
    @ApiProperty()
    XP: number
    
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    chapterId: string
    
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    courseId: string
}
