import { ApiProperty } from "@nestjs/swagger";
import { ObjectId } from "mongodb";
import { LocalString } from "src/utils/local-string";
import { Column, Entity, ObjectIdColumn } from "typeorm";

@Entity('math-equations')
export class MathEquation {
    @ObjectIdColumn()
    id: ObjectId;

    @Column()
    @ApiProperty()
    title: string
    
    @Column()
    @ApiProperty()
    equation: string
    
    @Column()
    @ApiProperty()
    description: LocalString
    
    @Column()
    @ApiProperty()
    discoverer: LocalString
    
    @Column()
    @ApiProperty({example:['67d7414c67c250f6268bd2d8','67d7414c67c250f6268bd2d2']})
    relatedCourses: string[]
    
    @Column()
    @ApiProperty()
    level: string
}
