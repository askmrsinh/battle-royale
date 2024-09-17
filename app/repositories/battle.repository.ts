import { EntityRepository, QueryOrder } from '@mikro-orm/core';
import { AttackEntity, BattleEntity, PlayerEntity, PlayerStateEntity } from '../entities';

export class BattleRepository extends EntityRepository<BattleEntity> {
  private static isAttackSuccessful(luck: number) {
    return Math.random() * 100 <= luck;
  }

  private static calculateDamage(attack: number, health: number) {
    return health <= 50 ? attack * 0.5 : (attack * health) / 100;
  }

  // Helper to get the last attack in the battle
  private async getLastAttack(battle: BattleEntity) {
    return this.em.findOne(AttackEntity, { battle }, { orderBy: { createdAt: QueryOrder.DESC } });
  }

  // Helper to get the current health of a player in the battle
  private async getLastHealth(battle: BattleEntity, player: PlayerEntity) {
    const lastState = await this.em.findOne(
      PlayerStateEntity,
      { attack: { battle }, player },
      { orderBy: { createdAt: QueryOrder.DESC } }
    );

    return lastState ? lastState.health : player.hit;
  }

  // Method to record the player state after each attack
  private async recordPlayerState(attack: AttackEntity, player: PlayerEntity, health: number) {
    const playerState = new PlayerStateEntity({ attack, player, health });
    this.em.persist(playerState);
  }

  // Method to initiate a new attack recursively until the battle ends
  async initiateAttack(battle: BattleEntity): Promise<AttackEntity | void> {
    if (battle.isFinished) throw Error('The battle has already ended.');

    // Fetch the last attack or set up the initial conditions
    const lastAttack = await this.getLastAttack(battle);
    const attacker = lastAttack ? lastAttack.determineNextAttacker() : battle.from;
    const opponent = attacker === battle.from ? battle.to : battle.from;

    const attackerHealth = await this.getLastHealth(battle, attacker);
    const opponentHealth = await this.getLastHealth(battle, opponent);

    // TODO: Simplify this logic
    // Check if the attack is successful based on luck
    if (!BattleRepository.isAttackSuccessful(attacker.luck)) {
      console.log(`Attack by ${attacker.name} failed due to bad luck.`);
      const attack = new AttackEntity(battle, attacker, 0);
      // Create and persist the attack with zero damage
      this.em.persist(attack);
      await this.recordPlayerState(attack, attacker, attackerHealth);
      await this.recordPlayerState(attack, opponent, opponentHealth);
      await this.em.flush();
    } else {
      // Calculate the damage for the attack
      const damage = BattleRepository.calculateDamage(attacker.attack, attackerHealth);
      const newOpponentHealth = Math.max(opponentHealth - damage, 0);

      // Create and persist the attack with calculated damage
      const attack = new AttackEntity(battle, attacker, damage);
      this.em.persist(attack);
      await this.recordPlayerState(attack, attacker, attackerHealth);
      await this.recordPlayerState(attack, opponent, newOpponentHealth);

      // Check if the battle should end
      if (newOpponentHealth <= 0) {
        battle.endBattle();
        await this.em.persistAndFlush(battle);
        return attack;
      }

      await this.em.persistAndFlush(attack);
    }

    // Recursively continue to the next attack
    return this.initiateAttack(battle);
  }
}
