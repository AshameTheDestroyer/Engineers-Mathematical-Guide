import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ObjectId, ObjectIdColumn } from 'typeorm';

@Entity('followers')
export class Follower {
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  @ApiProperty()
  follower: string
  
  @Column()
  @ApiProperty()
  followee: string
}
