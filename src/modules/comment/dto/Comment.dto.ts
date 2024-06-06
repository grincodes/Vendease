import {
  IsDate,
  IsDateString,
  IsEnum,
  IsIP,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from "class-validator";

export class CommentDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(250)
  comment: string;

  @IsIP(4)
  ip_address_location: string;

  @IsUUID()
  episode_id: string;
}
