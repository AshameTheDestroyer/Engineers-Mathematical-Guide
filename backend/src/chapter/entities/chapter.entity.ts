import { ApiProperty } from "@nestjs/swagger";
import { LocalString } from "src/utils/local-string";
import { Column, Entity, ObjectId, ObjectIdColumn } from "typeorm";

@Entity('chapters')
export class Chapter {
  @ObjectIdColumn()
  id: ObjectId
  
  @Column()
  @ApiProperty()
  title: LocalString
  
  @Column()
  @ApiProperty()
  description: LocalString
  
  @Column()
  @ApiProperty()
  examDuration: number
  
  @Column()
  @ApiProperty()
  sortNumber: number
  
  @Column()
  @ApiProperty({example:['67d7414c67c250f6268bd2d8','67d7414c67c250f6268bd2d2']})
  examQuestions: string[]

  @Column()
  @ApiProperty({example:['67d7414c67c250f6268bd2d8','67d7414c67c250f6268bd2d2']})
  lessons: string[]
  
  @Column()
  @ApiProperty({example:"67d7414c67c250f6268bd2d8"})
  courseId: string
}