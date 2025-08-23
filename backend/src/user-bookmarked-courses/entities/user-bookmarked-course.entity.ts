import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ObjectId, ObjectIdColumn } from 'typeorm';

@Entity('users-bookmarked-courses')
export class UserBookmarkedCourse {
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  @ApiProperty()
  userId: string
  
  @Column()
  @ApiProperty()
  courseId: string
}