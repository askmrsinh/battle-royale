import { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import {PlayerFactory} from "../factories";

export class DatabaseSeeder extends Seeder {
  public static readonly ALPHABETS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  async run(em: EntityManager) {
    const playerFactory = new PlayerFactory(em);
    const players = DatabaseSeeder.ALPHABETS.map(r => playerFactory.createOne({name: "Player " + r}))

    await Promise.all(players);
  }
}
