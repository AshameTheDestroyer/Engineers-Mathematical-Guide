import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ObjectId, ObjectIdColumn } from 'typeorm';

@Entity('courses')
export class Course {
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  @ApiProperty()
  title: string
  
  @Column()
  @ApiProperty()
  description: string

  @Column()
  @ApiProperty()
  image: string
  
  @Column({default:0})
  @ApiProperty()
  enrollmentCount!: number
  
  @Column({default:0})
  @ApiProperty()
  ratingsCount!: number
  
  @Column({default:0})
  @ApiProperty()
  ratingsSum!: number

  @Column({default:0})
  @ApiProperty()
  ratingsTotalNumber!: number
  
  @Column({default:0})
  @ApiProperty()
  averageRate!: number
  
  @Column({default:0})
  @ApiProperty()
  examDuration: number
  
  @Column({default:0})
  @ApiProperty()
  examXP: number
  
  @Column({default:[]})
  @ApiProperty({example:['67d7414c67c250f6268bd2d8','67d7414c67c250f6268bd2d2']})
  prerequisites: string[]
  
  @Column({default:[]})
  @ApiProperty({example:['67d7414c67c250f6268bd2d8','67d7414c67c250f6268bd2d2']})
  postrequisites: string[]
  
  @Column({default:[]})
  @ApiProperty({example:['67d7414c67c250f6268bd2d8','67d7414c67c250f6268bd2d2']})
  chapters: string[]
  
  @Column({default:[]})
  @ApiProperty({example:['67d7414c67c250f6268bd2d8','67d7414c67c250f6268bd2d2']})
  examQuestions: string[]
}
