import { IsString } from "class-validator";

export class SortKeyDTO {
    @IsString()
    key: "place" | "username" | "id" ;

    @IsString()
    order:"ASC" | "DESC"
}