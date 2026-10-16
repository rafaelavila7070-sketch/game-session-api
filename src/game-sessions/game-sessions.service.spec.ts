import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

import { GameSessionsService } from './game-sessions.service';
import { GameSession } from './entities/game-session.entity';
import { PlayersService } from '../players/players.service';

describe('GameSessionsService', () => {
  let service: GameSessionsService;

  let gameSessionsRepository: jest.Mocked<
    Pick<
      Repository<GameSession>,
      'create' | 'save' | 'find' | 'findOne'
    >
  >;

  let playersService: jest.Mocked<
    Pick<PlayersService, 'findOne'>
  >;

  beforeEach(async () => {
    gameSessionsRepository = {
      create: jest.fn(),
      save: jest.fn(),
      find: jest.fn(),
      findOne: jest.fn(),
    };

    playersService = {
      findOne: jest.fn(),
    };

    const module: TestingModule =
      await Test.createTestingModule({
        providers: [
          GameSessionsService,
          {
            provide: getRepositoryToken(GameSession),
            useValue: gameSessionsRepository,
          },
          {
            provide: PlayersService,
            useValue: playersService,
          },
        ],
      }).compile();

    service = module.get<GameSessionsService>(
      GameSessionsService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a game session when the player exists', async () => {
    const player = {
      id: 1,
      name: 'Rafael',
      email: 'rafael@example.com',
    } as any;

    const savedSession = {
      id: 10,
      score: 150,
      player,
    } as GameSession;

    playersService.findOne.mockResolvedValue(player);

    gameSessionsRepository.create.mockReturnValue(
      savedSession,
    );

    gameSessionsRepository.save.mockResolvedValue(
      savedSession,
    );

    const result = await service.create(1, 150);

    expect(playersService.findOne).toHaveBeenCalledWith(1);

    expect(
      gameSessionsRepository.create,
    ).toHaveBeenCalledWith({
      player,
      score: 150,
    });

    expect(
      gameSessionsRepository.save,
    ).toHaveBeenCalledWith(savedSession);

    expect(result).toEqual(savedSession);
  });

  it('should throw NotFoundException when the player does not exist', async () => {
    playersService.findOne.mockResolvedValue(null);

    await expect(
      service.create(9999, 150),
    ).rejects.toThrow(NotFoundException);

    expect(playersService.findOne).toHaveBeenCalledWith(
      9999,
    );

    expect(
      gameSessionsRepository.create,
    ).not.toHaveBeenCalled();

    expect(
      gameSessionsRepository.save,
    ).not.toHaveBeenCalled();
  });
  it('should update the score of an existing game session', async () => {
  const existingSession = {
    id: 1,
    score: 150,
  } as GameSession;

  const updatedSession = {
    id: 1,
    score: 300,
  } as GameSession;

  gameSessionsRepository.findOne.mockResolvedValue(
    existingSession,
  );

  gameSessionsRepository.save.mockResolvedValue(
    updatedSession,
  );

  const result = await service.update(1, {
    score: 300,
  });

  expect(
    gameSessionsRepository.findOne,
  ).toHaveBeenCalledWith({
    where: { id: 1 },
    relations: { player: true },
  });

  expect(
    gameSessionsRepository.save,
  ).toHaveBeenCalledWith(
    expect.objectContaining({
      id: 1,
      score: 300,
    }),
  );

  expect(result.score).toBe(300);
});
  it('should throw NotFoundException when updating a nonexistent game session', async () => {
  gameSessionsRepository.findOne.mockResolvedValue(
    null,
  );

  await expect(
    service.update(9999, { score: 300 }),
  ).rejects.toThrow(NotFoundException);

  expect(
    gameSessionsRepository.findOne,
  ).toHaveBeenCalledWith({
    where: { id: 9999 },
    relations: { player: true },
  });

  expect(
    gameSessionsRepository.save,
  ).not.toHaveBeenCalled();
})
  it('should preserve the player when updating only the score', async () => {
  const player = {
    id: 1,
    name: 'Rafael',
    email: 'rafael@example.com',
  } as any;

  const existingSession = {
    id: 1,
    score: 150,
    player,
  } as GameSession;

  gameSessionsRepository.findOne.mockResolvedValue(
    existingSession,
  );

  gameSessionsRepository.save.mockImplementation(
    async (session) => session as GameSession,
  );

  const result = await service.update(1, {
    score: 300,
  });

  expect(result.score).toBe(300);
  expect(result.id).toBe(1);
  expect(result.player).toEqual(player);

  expect(
    gameSessionsRepository.save,
  ).toHaveBeenCalledWith(
    expect.objectContaining({
      id: 1,
      score: 300,
      player,
    }),
  );
});
  it('should return a game session by id', async () => {
  const player = {
    id: 1,
    name: 'Rafael',
    email: 'rafael@example.com',
  } as any;

  const gameSession = {
    id: 1,
    score: 300,
    player,
  } as GameSession;

  gameSessionsRepository.findOne.mockResolvedValue(
    gameSession,
  );

  const result = await service.findOne(1);

  expect(
    gameSessionsRepository.findOne,
  ).toHaveBeenCalledWith({
    where: { id: 1 },
    relations: { player: true },
  });

  expect(result).toEqual(gameSession);
  expect(result.player).toEqual(player);
});
  it('should throw NotFoundException when the game session does not exist', async () => {
  gameSessionsRepository.findOne.mockResolvedValue(
    null,
  );

  await expect(
    service.findOne(9999),
  ).rejects.toThrow(NotFoundException);

  expect(
    gameSessionsRepository.findOne,
  ).toHaveBeenCalledWith({
    where: { id: 9999 },
    relations: { player: true },
  });
});
  it('should return all game sessions', async () => {
  const player = {
    id: 1,
    name: 'Rafael',
    email: 'rafael@example.com',
  } as any;

  const sessions = [
    {
      id: 1,
      score: 150,
      player,
    },
    {
      id: 2,
      score: 300,
      player,
    },
  ] as GameSession[];

  gameSessionsRepository.find.mockResolvedValue(
    sessions,
  );

  const result = await service.findAll();

  expect(
    gameSessionsRepository.find,
  ).toHaveBeenCalledWith({
    relations: { player: true },
  });

  expect(result).toEqual(sessions);
  expect(result).toHaveLength(2);
});
  it('should return an empty array when there are no game sessions', async () => {
  gameSessionsRepository.find.mockResolvedValue([]);

  const result = await service.findAll();

  expect(
    gameSessionsRepository.find,
  ).toHaveBeenCalledWith({
    relations: { player: true },
  });

  expect(result).toEqual([]);
  expect(result).toHaveLength(0);
});
});