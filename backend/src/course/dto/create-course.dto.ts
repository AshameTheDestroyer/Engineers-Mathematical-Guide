import { ApiProperty } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
import { LocalString } from "src/utils/local-string";

export class CreateCourseDto {
    @ValidateNested()
    @Type(() => LocalString)
    @ApiProperty({example:{"ar":"مرحبا","en":"Hello"}})
    @Transform(({ value }) => {
        if(typeof value=='string') {
            value = JSON.parse(value);
            value = new LocalString(value.en,value.ar);
        }
        return value;
    })
    title: LocalString
    
    @ValidateNested()
    @Type(() => LocalString)
    @ApiProperty({example:{"ar":"مرحبا","en":"Hello"}})
    @Transform(({ value }) => {
        if(typeof value=='string') {
            value = JSON.parse(value);
            value = new LocalString(value.en,value.ar);
        }
        return value;
    })
    description: LocalString
    
    @IsArray()
    @IsOptional()
    @ApiProperty({example:['67d7414c67c250f6268bd2d8','67d7414c67c250f6268bd2d2']})
    @Transform(({ value }) => {return new Array(value);})
    prerequisites: string[]
    
    @IsArray()
    @IsOptional()
    @ApiProperty({example:['67d7414c67c250f6268bd2d8','67d7414c67c250f6268bd2d2']})
    @Transform(({ value }) => {return new Array(value);})
    postrequisites: string[]
    
    @IsArray()
    @IsNotEmpty()
    @ApiProperty({example:['67d7414c67c250f6268bd2d8','67d7414c67c250f6268bd2d2']})
    @Transform(({ value }) => {return new Array(value);})
    chapters: string[]

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