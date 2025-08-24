import { Column, Entity, ObjectId, ObjectIdColumn } from 'typeorm';
import * as bcryptjs from 'bcryptjs';
import { ApiProperty } from '@nestjs/swagger';
import { LocalString } from 'src/utils/local-string';
import { UserGender } from 'src/utils/types';

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
  name: LocalString;
  
  @Column()
  @ApiProperty()
  surname: LocalString;

  @Column()
  @ApiProperty()
  bio: LocalString;
  
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

  @ApiProperty({ 
    enum: UserGender, 
    example: UserGender.MALE, 
  })
  @Column({
    type: 'enum',
    enum: UserGender,
    nullable: false
  })
  type: UserGender
  
  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcryptjs.hash(password, this.salt);
    return this.password === hash;
  }
}
