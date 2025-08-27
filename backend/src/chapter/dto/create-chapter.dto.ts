import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsNotEmpty, IsNumber, IsString, ValidateNested } from "class-validator";
import { LocalString } from "src/utils/local-string";

export class CreateChapterDto {
    @ValidateNested()
    @Type(() => LocalString)
    @ApiProperty({example:{"ar":"مرحبا","en":"Hello"}})
    title: LocalString
    
    @ValidateNested()
    @Type(() => LocalString)
    @ApiProperty({example:{"ar":"مرحبا","en":"Hello"}})
    description: LocalString
    
    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({description: "should be in minutes"})
    examDuration: number
    
    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    sortNumber: number
    
    @IsString()
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
    examQuestions: string[]
}