import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';

import { Player } from '../../players/entities/player.entity';

@Entity('game_sessions')
export class GameSession {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'integer', default: 0 })
  score: number;

  @CreateDateColumn()
  startedAt: Date;

  @ManyToOne(() => Player, { nullable: false })
  player: Player;
}