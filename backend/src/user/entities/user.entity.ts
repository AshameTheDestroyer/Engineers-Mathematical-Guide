import { Column, Entity, ObjectId, ObjectIdColumn } from 'typeorm';
import * as bcryptjs from 'bcryptjs';

@Entity('users')
export class User {
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  phoneNumber: string;

  @Column()
  firstName: string;

  @Column()
  sirName: string;

  @Column()
  country: string;

  @Column()
  salt!: string;

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcryptjs.hash(password, this.salt);
    return this.password === hash;
  }
}
