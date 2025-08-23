import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, ObjectId, ObjectIdColumn } from "typeorm";

@Entity('chapters')
export class Chapter {
  @ObjectIdColumn()
  id: ObjectId
  
  @Column()
  @ApiProperty()
  title: string
  
  @Column()
  @ApiProperty()
  description: string
  
  @Column()
  @ApiProperty()
  quizDuration: number
  
  @Column()
  @ApiProperty()
  quizXP: number
  
  @Column()
  @ApiProperty()
  sortNumber: number
  
  @Column()
  @ApiProperty({example:['67d7414c67c250f6268bd2d8','67d7414c67c250f6268bd2d2']})
  quizQuestions: string[]

  @Column()
  @ApiProperty({example:['67d7414c67c250f6268bd2d8','67d7414c67c250f6268bd2d2']})
  lessons: string[]
  
  @Column()
  @ApiProperty({example:"67d7414c67c250f6268bd2d8"})
  courseId: string
}