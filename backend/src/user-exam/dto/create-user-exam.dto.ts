import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateUserExamDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    userId: string
    
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    chapterId: string
    
    grade: number = 0
    
    XP: number = 0
    
    startDate: Date = new Date()

    finishDate: Date = new Date()
}
