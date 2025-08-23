import { Column, Entity, ObjectId, ObjectIdColumn } from "typeorm";

@Entity('last-month-activity')
export class LastMonthActivity {
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  userId: string

  @Column()
  XP: number

  @Column()
  date: Date
}
