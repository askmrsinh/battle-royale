import { PrimaryKey, Property } from '@mikro-orm/better-sqlite';

export abstract class BaseEntity {
  @PrimaryKey()
  id: string = crypto.randomUUID();

  @Property()
  createdAt: number = Date.now();
}
