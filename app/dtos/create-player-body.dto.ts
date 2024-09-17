import 'reflect-metadata';
import { IsString, MaxLength, MinLength } from 'class-validator';
import { Expose } from 'class-transformer';

export class CreatePlayerBodyDto {
  @Expose()
  @MaxLength(32)
  @MinLength(3)
  @IsString()
  name!: string;
}
