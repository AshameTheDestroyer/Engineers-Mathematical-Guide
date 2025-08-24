import { ApiProperty } from '@nestjs/swagger';
import { LocalString } from 'src/utils/local-string';
import { Column, Entity, ObjectId, ObjectIdColumn } from 'typeorm';

@Entity('courses')
export class Course {
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  @ApiProperty()
  title: LocalString
  
  @Column()
  @ApiProperty()
  description: LocalString

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
  
  @Column({default:[]})
  @ApiProperty({example:['67d7414c67c250f6268bd2d8','67d7414c67c250f6268bd2d2']})
  prerequisites: string[]
  
  @Column({default:[]})
  @ApiProperty({example:['67d7414c67c250f6268bd2d8','67d7414c67c250f6268bd2d2']})
  postrequisites: string[]
  
  @Column({default:[]})
  @ApiProperty({example:['67d7414c67c250f6268bd2d8','67d7414c67c250f6268bd2d2']})
  chapters: string[]
}
