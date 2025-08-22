import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, ObjectId, ObjectIdColumn } from "typeorm";

@Entity('questions')
export class Question {
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  @ApiProperty()
  question: string

  @Column()
  @ApiProperty()
  options: string[]

  @Column()
  @ApiProperty()
  answer: string

  @Column()
  @ApiProperty()
  XP: number
  
  @Column()
  @ApiProperty()
  chapterId: string

  @Column()
  @ApiProperty()
  courseId: string
}
