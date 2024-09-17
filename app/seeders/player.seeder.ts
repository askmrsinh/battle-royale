import { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { PlayerFactory } from '../factories';

export class PlayerSeeder extends Seeder {
  async run(em: EntityManager) {
    await new PlayerFactory(em).create(50);
  }
}
