import { Entity, Property } from '@mikro-orm/better-sqlite';
import { BaseEntity } from './base/base-entity';

@Entity({ tableName: 'player' })
export class PlayerEntity extends BaseEntity {

  @Property()
  name!: string;

  @Property()
  gold!: number;

  @Property()
  attack!: number;

  @Property()
  hit!: number;

  @Property()
  luck!: number;

  constructor(obj: {name: string, gold: number, attack: number, hit: number, luck: number}) {
    super();
    this.name = obj.name;
    this.gold = obj.gold;
    this.attack =obj.attack;
    this.hit = obj.hit;
    this.luck = obj.luck;
  }
}
