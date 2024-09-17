import { Migration } from '@mikro-orm/migrations';

export class Migration20240917171503 extends Migration {

  override async up(): Promise<void> {
    this.addSql('create table `player` (`id` text not null, `created_at` integer not null, `name` text not null, `gold` integer not null, `attack` integer not null, `hit` integer not null, `luck` integer not null, primary key (`id`));');

    this.addSql('create table `battle` (`id` text not null, `created_at` integer not null, `from_id` text not null, `to_id` text not null, `is_finished` integer not null default false, constraint `battle_from_id_foreign` foreign key(`from_id`) references `player`(`id`) on update cascade, constraint `battle_to_id_foreign` foreign key(`to_id`) references `player`(`id`) on update cascade, primary key (`id`), constraint battle_check check (from_id <> to_id));');
    this.addSql('create index `battle_from_id_index` on `battle` (`from_id`);');
    this.addSql('create index `battle_to_id_index` on `battle` (`to_id`);');

    this.addSql('create table `attack` (`id` text not null, `created_at` integer not null, `battle_id` text not null, `attacker_id` text not null, `damage` integer not null, constraint `attack_battle_id_foreign` foreign key(`battle_id`) references `battle`(`id`) on update cascade, constraint `attack_attacker_id_foreign` foreign key(`attacker_id`) references `player`(`id`) on update cascade, primary key (`id`));');
    this.addSql('create index `attack_battle_id_index` on `attack` (`battle_id`);');
    this.addSql('create index `attack_attacker_id_index` on `attack` (`attacker_id`);');

    this.addSql('create table `player_state` (`id` text not null, `created_at` integer not null, `attack_id` text not null, `player_id` text not null, `health` integer not null, constraint `player_state_attack_id_foreign` foreign key(`attack_id`) references `attack`(`id`) on update cascade, constraint `player_state_player_id_foreign` foreign key(`player_id`) references `player`(`id`) on update cascade, primary key (`id`));');
    this.addSql('create index `player_state_attack_id_index` on `player_state` (`attack_id`);');
    this.addSql('create index `player_state_player_id_index` on `player_state` (`player_id`);');
  }

}
