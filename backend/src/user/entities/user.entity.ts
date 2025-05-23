import * as bcryptjs from "bcryptjs";
import { Column, Entity, ObjectId, ObjectIdColumn } from "typeorm";

@Entity("users")
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
    name: string;

    @Column()
    surname: string;

    @Column()
    country: string;

    @Column()
    salt!: string;

    async validatePassword(password: string): Promise<boolean> {
        const hash = await bcryptjs.hash(password, this.salt);
        return this.password == hash;
    }
}
