import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateCoursesTagDto {
    @IsNotEmpty()
    @ApiProperty()
    @IsString()
    courseId: string

    @IsNotEmpty()
    @ApiProperty()
    @IsString()
    tagId: string
}
