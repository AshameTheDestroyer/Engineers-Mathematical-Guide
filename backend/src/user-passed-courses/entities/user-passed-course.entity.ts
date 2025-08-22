import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ObjectId, ObjectIdColumn } from 'typeorm';

@Entity('users-passed-courses')
export class UserPassedCourse {
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
	grade: number
  
	@Column()
  @ApiProperty()
	gradedDate: Date
  
	@Column()
  @ApiProperty()
  certificateLink: string
}