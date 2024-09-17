import { Entity, ManyToOne, Property } from '@mikro-orm/core';
import { BaseEntity } from './base/base-entity';
import { AttackEntity } from './attack.entity';
import { PlayerEntity } from './player.entity';

@Entity({ tableName: 'player_state' })
export class PlayerStateEntity extends BaseEntity {
  @ManyToOne(() => AttackEntity)
  attack!: AttackEntity;

  @ManyToOne(() => PlayerEntity)
  player!: PlayerEntity;

  @Property()
  health!: number; // Health of the player after the attack

  constructor(obj: { attack: AttackEntity; player: PlayerEntity; health: number }) {
    super();
    this.attack = obj.attack;
    this.player = obj.player;
    this.health = obj.health;
  }
}
