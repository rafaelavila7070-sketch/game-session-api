
import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { GameSession } from './entities/game-session.entity';
import { PlayersService } from '../players/players.service';
import { UpdateGameSessionDto } from './dto/update-game-session.dto';

@Injectable()
export class GameSessionsService {
  constructor(
    @InjectRepository(GameSession)
    private readonly gameSessionsRepository: Repository<GameSession>,

    private readonly playersService: PlayersService,
  ) {}

  async create(
    playerId: number,
    score: number,
  ): Promise<GameSession> {
    const player = await this.playersService.findOne(playerId);

    if (!player) {
      throw new NotFoundException('Player not found');
    }

    const gameSession = this.gameSessionsRepository.create({
      player,
      score,
    });

    return this.gameSessionsRepository.save(gameSession);
  }

  findAll(): Promise<GameSession[]> {
    return this.gameSessionsRepository.find({
      relations: {
        player: true,
      },
    });
  }

  async findOne(id: number): Promise<GameSession> {
    const gameSession = await this.gameSessionsRepository.findOne({
      where: {
        id,
      },
      relations: {
        player: true,
      },
    });

    if (!gameSession) {
      throw new NotFoundException('Game session not found');
    }

    return gameSession;
  }
  async update(
  id: number,
  updateGameSessionDto: UpdateGameSessionDto,
): Promise<GameSession> {
  const gameSession = await this.findOne(id);

  Object.assign(gameSession, updateGameSessionDto);

  return this.gameSessionsRepository.save(gameSession);
}
}
