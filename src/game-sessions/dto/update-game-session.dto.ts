import {IsInt, Min, IsOptional } from 'class-validator';

    export class UpdateGameSessionDto {
        @IsOptional()
        @IsInt()
        @Min(0)
        score?: number;
    }
