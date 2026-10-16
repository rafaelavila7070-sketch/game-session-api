import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { PlayersModule } from './players/players.module';
import { GameSessionsModule } from './game-sessions/game-sessions.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: process.env.DB_PASSWORD,
      database: 'game_session',
      autoLoadEntities: true,
      synchronize: true,
    }),
    PlayersModule,
    GameSessionsModule,
  ],
})
export class AppModule {}