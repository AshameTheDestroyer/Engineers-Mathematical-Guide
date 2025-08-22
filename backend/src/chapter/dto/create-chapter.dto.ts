import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateChapterDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    title: string

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    description: string
    
    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    quizDuration: number

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    quizXP: number
    
    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    sortNumber: number
    
    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    courseId: string
    
    @IsArray()
    @IsNotEmpty()
    @ApiProperty({example:['67d7414c67c250f6268bd2d8','67d7414c67c250f6268bd2d2']})
    lessons: string[]

    @IsArray()
    @IsNotEmpty()
    @ApiProperty({example:['67d7414c67c250f6268bd2d8','67d7414c67c250f6268bd2d2']})
    quizQuestions: string[]
}