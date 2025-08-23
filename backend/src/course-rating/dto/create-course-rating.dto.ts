import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional, IsString, Max, Min, min, ValidateNested } from "class-validator";
import { LocalString } from "src/utils/local-string";

export class CreateCourseRatingDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    userId: string

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    courseId: string
    
    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    @Max(5)
    @ApiProperty()
    rating: number

    @ValidateNested()
    @Type(() => LocalString)
    @ApiProperty({example:{"ar":"مرحبا","en":"Hello"}})
    feedback: LocalString
}
