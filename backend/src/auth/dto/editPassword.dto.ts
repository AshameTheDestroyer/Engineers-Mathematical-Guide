import { IsString, MinLength } from "class-validator";

export class EditPasswordDTO {
    @IsString()
    @MinLength(8)
    newPassword: string;
}
