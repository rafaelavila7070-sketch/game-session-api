
import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  ParseIntPipe,
  Patch,
} from '@nestjs/common';

import { GameSessionsService } from './game-sessions.service';
import { CreateGameSessionDto } from './dto/create-game-session.dto';
import { UpdateGameSessionDto } from './dto/update-game-session.dto';

@Controller('game-sessions')
export class GameSessionsController {
  constructor(
    private readonly gameSessionsService: GameSessionsService,
  ) {}

  @Post()
  create(@Body() body: CreateGameSessionDto) {
    return this.gameSessionsService.create(
      body.playerId,
      body.score,
    );
  }

  @Get()
  findAll() {
    return this.gameSessionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.gameSessionsService.findOne(id);
  }
@Patch(':id')
update(
  @Param('id', ParseIntPipe) id: number,
  @Body() body: UpdateGameSessionDto,
) {
  return this.gameSessionsService.update(id, body);
}
}
