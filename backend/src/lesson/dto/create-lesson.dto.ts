import { ApiProperty } from "@nestjs/swagger"
import { Type } from "class-transformer"
import { IsEnum, IsNotEmpty, IsNumber, IsString, ValidateNested } from "class-validator"
import { LocalString } from "src/utils/local-string"
import { LessonType } from "src/utils/types"

export class CreateLessonDto {
    @ValidateNested()
    @Type(() => LocalString)
    @ApiProperty({example:{"ar":"مرحبا","en":"Hello"}})
    title: LocalString
    
    @ValidateNested()
    @Type(() => LocalString)
    @ApiProperty({example:{"ar":"مرحبا","en":"Hello"}})
    content: LocalString
    
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    videoUrl: string

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    chapterId: string
    
    @IsNotEmpty()
    @IsNumber()
    @ApiProperty()
    duration: number
    
    @ApiProperty({ 
        enum: LessonType, 
        example: LessonType.READING 
    })
    @IsEnum(LessonType, { message: 'Invalid lessonType reading OR video' })
    @IsNotEmpty({ message: 'LessonType is required' })
    type: LessonType

    @IsNotEmpty()
    @IsNumber()
    @ApiProperty()
    sortNumber: number
    
    @IsNotEmpty()
    @IsNumber()
    @ApiProperty()
    XP: number
}
