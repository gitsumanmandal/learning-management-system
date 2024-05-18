import { Column } from 'typeorm';

export class BaseEntity {
  @Column()
  createdBy: string;

  @Column()
  createdAt: Date;

  @Column()
  lastUpdatedBy: string;

  @Column()
  lastUpdatedAt: Date;
}
