import { ApiProperty } from "@nestjs/swagger";
import { LocalString } from "src/utils/local-string";
import { LessonType } from "src/utils/types";
import { Column, Entity, ObjectId, ObjectIdColumn } from "typeorm";

@Entity('lessons')
export class Lesson {
  @ObjectIdColumn()
  id: ObjectId;
  
  @Column()
  @ApiProperty()
  title: LocalString
  
  @Column()
  @ApiProperty()
  content: LocalString
  
  @Column()
  @ApiProperty()
  videoUrl: string

  @Column()
  @ApiProperty()
  sortNumber: number
  
  @Column()
  @ApiProperty()
  duration: number

  @ApiProperty({ 
    enum: LessonType, 
    example: LessonType.READING, 
  })
  @Column({
    type: 'enum',
    enum: LessonType,
    nullable: false
  })
  type: LessonType
  
  @Column()
  @ApiProperty()
  XP: number
  
  @Column()
  @ApiProperty()
  chapterId: string
}
