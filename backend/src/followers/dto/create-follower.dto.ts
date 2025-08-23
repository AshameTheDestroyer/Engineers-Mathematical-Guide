import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateFollowerDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    follower: string

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    followee: string
}
