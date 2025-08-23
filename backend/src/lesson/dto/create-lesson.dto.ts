import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateLessonDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    title: string
    
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    content: string
    
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    video: string
    
    @IsNotEmpty()
    @IsNumber()
    @ApiProperty()
    sortNumber: number
    
    @IsNotEmpty()
    @IsNumber()
    @ApiProperty()
    XP: number
}
