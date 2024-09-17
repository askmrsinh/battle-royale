import { Factory } from '@mikro-orm/seeder';
import { PlayerEntity } from '../entities/';
import { faker } from '@faker-js/faker';

export class PlayerFactory extends Factory<PlayerEntity> {
  model = PlayerEntity;

  definition(): Partial<PlayerEntity> {
    return {
      name: faker.person.fullName(),
      gold: 1000000,
      attack: faker.number.int({ min: 0, max: 100 }),
      hit: faker.number.int({ min: 0, max: 100 }),
      luck: faker.number.int({ min: 0, max: 100 })
    };
  }
}
