import {
  EntityRepositoryType,
  Entity,
  Property,
  ManyToOne,
  OneToMany,
  Check
} from '@mikro-orm/core';
import { BaseEntity } from './base/base-entity';
import { PlayerEntity } from './player.entity';
import { AttackEntity } from './attack.entity';
import { Collection } from '@mikro-orm/core';
import { BattleRepository } from '../repositories';

@Entity({ tableName: 'battle', repository: () => BattleRepository })
@Check({ expression: 'from_id <> to_id' })
export class BattleEntity extends BaseEntity {
  [EntityRepositoryType]?: BattleRepository;

  @ManyToOne(() => PlayerEntity)
  from!: PlayerEntity;

  @ManyToOne(() => PlayerEntity)
  to!: PlayerEntity;

  @OneToMany(() => AttackEntity, (attack) => attack.battle)
  attacks = new Collection<AttackEntity>(this);

  @Property({ default: false })
  isFinished: boolean = false;

  constructor(from: PlayerEntity, to: PlayerEntity) {
    super();
    if (from.id === to.id) {
      throw new Error('The "from" and "to" players must be different.');
    }
    this.from = from;
    this.to = to;
  }

  endBattle() {
    this.isFinished = true;
  }
}
