import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ObjectId, ObjectIdColumn } from 'typeorm';

@Entity('users-enrolled-courses')
export class UserEnrolledCourse {
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  @ApiProperty()
  userId: string
  
  @Column()
  @ApiProperty()
  courseId: string
  
  @Column()
  @ApiProperty()
  chapterNum: number
  
  @Column()
  @ApiProperty()
  lessonNum: number

  @Column()
  @ApiProperty()
  canDoExam: boolean
  
  @Column()
  @ApiProperty()
  progress: number
  
  @Column()
  @ApiProperty()
  lastStudied: Date
}
