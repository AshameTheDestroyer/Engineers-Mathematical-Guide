import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, ObjectId, ObjectIdColumn } from "typeorm";

@Entity('lessons')
export class Lesson {
  @ObjectIdColumn()
  id: ObjectId;
  
  @Column()
  @ApiProperty()
  title: string
  
  @Column()
  @ApiProperty()
  content: string
  
  @Column()
  @ApiProperty()
  video: string
  
  @Column()
  @ApiProperty()
  sortNumber: number

  @Column()
  @ApiProperty()
  XP: number
}
