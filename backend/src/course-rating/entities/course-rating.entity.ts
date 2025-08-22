import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, JoinColumn, ObjectId, ObjectIdColumn, OneToOne } from "typeorm";

@Entity('course-ratings')
export class CourseRating {
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  @ApiProperty()
  userId: string

  @Column()
  @ApiProperty()
  courseId: string

  @Column({default:0})
  @ApiProperty()
  rating: number
  
  @Column()
  @ApiProperty()
  feedback: string
}
