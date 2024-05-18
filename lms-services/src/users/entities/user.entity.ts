import { Column, Entity, ObjectId, ObjectIdColumn } from 'typeorm';
import { BaseEntity } from 'src/base/base.entity';

@Entity()
export class User {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  role: 'ADMIN' | 'TEACHER' | 'STUDENT';

  @Column()
  name: string;

  @Column({
    unique: true,
  })
  userName: string;

  @Column({
    unique: true,
  })
  emailId: string;

  @Column()
  contactNo: string;

  @Column()
  password: string;

  @Column(() => BaseEntity)
  metaData: BaseEntity;
}
