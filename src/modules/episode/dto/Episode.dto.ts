import {
  IsDate,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from "class-validator";

export class EpisodeDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsDateString()
  release_date: Date;

  episode_code: string;

  @IsUUID()
  character_id: string;
}
