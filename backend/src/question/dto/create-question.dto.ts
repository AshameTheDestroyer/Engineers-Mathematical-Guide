import { ApiProperty } from "@nestjs/swagger"
import { Type } from "class-transformer"
import { IsArray, IsNotEmpty, IsNumber, IsString, ValidateNested } from "class-validator"
import { LocalString } from "src/utils/local-string"

export class CreateQuestionDto {
    @ValidateNested()
    @Type(() => LocalString)
    @ApiProperty({example:{"ar":"مرحبا","en":"Hello"}})
    question: LocalString
    
    @IsNotEmpty()
    @IsArray()
    @ApiProperty()
    options: string[]
    
    @IsNotEmpty()
    @IsArray()
    @ApiProperty()
    answer: string[]
    
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
