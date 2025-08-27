import { ApiProperty } from "@nestjs/swagger";
import { LocalString } from "src/utils/local-string";
import { Column, Entity, ObjectId, ObjectIdColumn } from "typeorm";

@Entity('questions')
export class Question {
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  @ApiProperty()
  question: LocalString

  @Column()
  @ApiProperty()
  options: string[]

  @Column()
  @ApiProperty()
  answers: string[]
  
  @Column()
  @ApiProperty()
  multipleAnswers: boolean

  @Column()
  @ApiProperty()
  XP: number
  
  @Column()
  @ApiProperty()
  chapterId: string
}
