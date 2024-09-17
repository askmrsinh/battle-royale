import { Entity, ManyToOne, Property, OneToMany } from '@mikro-orm/core';
import { BaseEntity } from './base/base-entity';
import { BattleEntity } from './battle.entity';
import { PlayerEntity } from './player.entity';
import { PlayerStateEntity } from './player-state.entity';
import { Collection } from '@mikro-orm/core';

@Entity({ tableName: 'attack' })
export class AttackEntity extends BaseEntity {
  @ManyToOne(() => BattleEntity)
  battle!: BattleEntity;

  @ManyToOne(() => PlayerEntity)
  attacker!: PlayerEntity;

  @Property()
  damage!: number; // Damage dealt in this attack

  @OneToMany(() => PlayerStateEntity, (state) => state.attack)
  states = new Collection<PlayerStateEntity>(this);

  constructor(battle: BattleEntity, attacker: PlayerEntity, damage: number) {
    super();
    this.battle = battle;
    this.attacker = attacker;
    this.damage = damage;
  }

  determineNextAttacker(): PlayerEntity {
    return this.attacker === this.battle.from ? this.battle.to : this.battle.from;
  }
}
