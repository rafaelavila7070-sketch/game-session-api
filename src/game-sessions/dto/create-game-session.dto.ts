import { IsInt, Min } from 'class-validator';

export class CreateGameSessionDto {
  @IsInt()
  @Min(0)
  score: number;

  @IsInt()
  @Min(1)
  playerId: number;
}
