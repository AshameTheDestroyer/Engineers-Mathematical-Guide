import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateUserPassedCourseDto {
    @IsNotEmpty()
    @ApiProperty()
    @IsString()
    userId: string;

    @IsNotEmpty()
    @ApiProperty()
    @IsString()
    courseId: string;
    
    @IsNotEmpty()
    @ApiProperty()
    @IsNumber()
    grade: number;
    
    @IsNotEmpty()
    @ApiProperty()
    @IsString()
    certificateLink: string;

    gradedDate: Date = new Date();
}
