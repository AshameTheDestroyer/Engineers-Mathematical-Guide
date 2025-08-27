import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty } from "class-validator"

export class FinishExamDto {
    @ApiProperty({example:{result:[{questionId:"abavasca7a677823234",answers:["first option","second option"]}]}})
    @IsNotEmpty()
    result: {questionId:string,answers:string[]}[]
}