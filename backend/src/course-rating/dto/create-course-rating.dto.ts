import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString, Max, Min, min } from "class-validator";

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

    @IsOptional()
    @IsString()
    @ApiProperty()
    feedback: string
}
