import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateTagDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    title: string;

    counter: number = 0;
}
