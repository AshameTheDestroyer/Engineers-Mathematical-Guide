import { ObjectId } from "mongodb";
import { Column, Entity, ObjectIdColumn } from "typeorm";

@Entity('tags')
export class Tag {
    @ObjectIdColumn()
    id: ObjectId;

    @Column()
    title: string

    @Column()
    counter: number
}
