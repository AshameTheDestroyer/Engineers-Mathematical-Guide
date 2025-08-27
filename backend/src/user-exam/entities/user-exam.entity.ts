import { ApiProperty } from "@nestjs/swagger";
import { ObjectId } from "mongodb";
import { Column, Entity, ObjectIdColumn } from "typeorm";

@Entity('user-course')
export class UserExam {
    @ObjectIdColumn()
    id: ObjectId;

    @Column()
    @ApiProperty()
    userId: string
    
    @Column()
    @ApiProperty()
    chapterId: string

    @Column()
    @ApiProperty()
    startDate: Date
    
    @Column()
    @ApiProperty()
    finishDate: Date
    
    @Column()
    @ApiProperty()
    grade: number

    @Column()
    @ApiProperty()
    XP: number
}
