import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateCourseDto {
    @IsNotEmpty()
    @ApiProperty()
    @IsString()
    title: string
    
    @IsNotEmpty()
    @ApiProperty()
    @IsString()
    description: string

    @IsNumber()
    @ApiProperty()
    @Transform(({ value }) => {
        if (typeof value === 'string') {
            return Number(value);
        }
        return value;
    })
    examDuration: number
    
    @IsNumber()
    @ApiProperty()
    @Transform(({ value }) => {
        if (typeof value === 'string') {
            return Number(value);
        }
        return value;
    })
    examXP: number
    
    @IsArray()
    @IsOptional()
    @ApiProperty({example:['67d7414c67c250f6268bd2d8','67d7414c67c250f6268bd2d2']})
    prerequisites: string[]
    
    @IsArray()
    @IsOptional()
    @ApiProperty({example:['67d7414c67c250f6268bd2d8','67d7414c67c250f6268bd2d2']})
    postrequisites: string[]
    
    @IsArray()
    @IsNotEmpty()
    @ApiProperty({example:['67d7414c67c250f6268bd2d8','67d7414c67c250f6268bd2d2']})
    chapters: string[]

    @IsArray()
    @IsNotEmpty()
    @ApiProperty({example:['67d7414c67c250f6268bd2d8','67d7414c67c250f6268bd2d2']})
    examQuestions: string[]

    @IsOptional()
    @ApiProperty({ 
        type: 'string', 
        format: 'binary',
        description: 'Course image file (optional)',
        required: false
    })
    image: any;

    ratingsSum: number = 0

    ratingsCount: number = 0

    ratingsTotalNumber: number = 0

    enrollmentCount: number = 0

    averageRate: number = 0
}