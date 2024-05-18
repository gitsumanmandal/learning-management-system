import { BaseEntity } from 'src/base/base.entity';
import { Entity, Column, ObjectId, ObjectIdColumn } from 'typeorm';

@Entity()
export class Course {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  teacher: string;

  @Column()
  status: string;

  @Column()
  totalLessons: number;

  @Column()
  enrollement: string[];

  @Column(() => Lesson)
  lessons: Lesson[];

  @Column(() => BaseEntity)
  metaData: BaseEntity;
}

export class Lesson {
  @Column()
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column(() => Topic)
  topics: Topic[];
}

export class Topic {
  @Column()
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  content: string;
}
