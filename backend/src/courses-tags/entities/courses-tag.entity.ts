import { ApiProperty } from "@nestjs/swagger";
import { ObjectId } from "mongodb";
import { Column, Entity, ObjectIdColumn } from "typeorm";

@Entity('courses-tags')
export class CoursesTag {
    @ObjectIdColumn()
    id: ObjectId;

    @Column()
    @ApiProperty()
    courseId: string
    
    @Column()
    @ApiProperty()
    tagId: string
}
