
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Player } from './entities/player.entity';

@Injectable()
export class PlayersService {
  constructor(
    @InjectRepository(Player)
    private readonly playersRepository: Repository<Player>,
  ) {}

  findAll(): Promise<Player[]> {
    return this.playersRepository.find();
  }

  create(name: string, email: string): Promise<Player> {
    const player = this.playersRepository.create({
      name,
      email,
    });
    return this.playersRepository.save(player);
  }
  findOne(id: number): Promise<Player | null> {
    return this.playersRepository.findOneBy({ id });
  }
}
