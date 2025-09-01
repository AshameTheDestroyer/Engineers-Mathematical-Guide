import { ApiProperty } from "@nestjs/swagger"
import { Type } from "class-transformer"
import { IsArray, IsBoolean, IsNotEmpty, IsNumber, IsString, ValidateNested } from "class-validator"
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
    answers: string[]
    
    @IsNotEmpty()
    @IsBoolean()
    @ApiProperty()
    multipleAnswers: boolean
    
    @IsNotEmpty()
    @IsNumber()
    @ApiProperty()
    XP: number
    
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    chapterId: string
}
