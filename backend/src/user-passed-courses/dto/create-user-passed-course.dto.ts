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

    gradedDate: Date = new Date();
}
