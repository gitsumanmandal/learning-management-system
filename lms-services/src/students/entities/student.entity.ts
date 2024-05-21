import { BaseEntity } from 'src/base/base.entity';
import { Column, Entity, ObjectId, ObjectIdColumn } from 'typeorm';

@Entity()
export class Student {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  userName: string;

  @Column(() => CompletionGraph)
  completionGraph: CompletionGraph[];

  @Column(() => BaseEntity)
  metaData: BaseEntity;
}

export class CompletionGraph {
  @Column()
  courseId: string;

  @Column()
  lessonId: string;
}
