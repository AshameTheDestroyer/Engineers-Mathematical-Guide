import { AchievementType } from "src/utils/types";
import { Column, Entity, ManyToOne, ObjectId, ObjectIdColumn, Relation } from "typeorm";

@Entity('achievements')
export class Achievement {
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  name: string
  
  @Column({
    type: 'enum',
    enum: AchievementType,
    default: AchievementType.Constant
  })
  type: AchievementType
  
  @Column({default:0})
  XP: number
}
