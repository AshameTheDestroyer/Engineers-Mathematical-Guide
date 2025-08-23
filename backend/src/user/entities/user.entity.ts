import { Column, Entity, ObjectId, ObjectIdColumn } from 'typeorm';
import * as bcryptjs from 'bcryptjs';
import { ApiProperty } from '@nestjs/swagger';

@Entity('users')
export class User {
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  @ApiProperty()
  username: string;
  
  @Column({ unique: true })
  @ApiProperty()
  email: string;
  
  @Column()
  @ApiProperty()
  password: string;
  
  @Column()
  @ApiProperty()
  phoneNumber: string;
  
  @Column()
  @ApiProperty()
  name: string;
  
  @Column()
  @ApiProperty()
  surname: string;

  @Column()
  @ApiProperty()
  bio: string;
  
  @Column()
  @ApiProperty()
  country: string;
  
  @Column()
  salt!: string;
  
  @Column({nullable:true})
  @ApiProperty()
  profileImage: string;
  
  @Column({nullable:true})
  @ApiProperty()
  coverImage: string;
  
  @Column({default: 0})
  @ApiProperty()
  XP!: number;
  
  @Column({default: 0})
  @ApiProperty()
  streak!: number;
  
  @Column({default: 0})
  @ApiProperty()
  followersCount!: number;
  
  @Column({default: 0})
  @ApiProperty()
  followeeCount!: number;
  
  @Column({default: Date.now()})
  @ApiProperty()
  lastSeen!: Date;
  
  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcryptjs.hash(password, this.salt);
    return this.password === hash;
  }
}
