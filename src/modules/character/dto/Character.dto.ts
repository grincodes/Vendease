import { IsEnum, IsNotEmpty, IsString, IsUUID } from "class-validator";

export enum CharacterStatusType {
  "ACTIVE" = "active",
  "DEAD" = "dead",
  "UNKNOWN" = "unknown",
}

export enum CharacterGenderType {
  "MALE" = "male",
  "FEMALE" = "female",
}


export class CharacterDto {
  @IsString()
  @IsNotEmpty()
  first_name: string;

  @IsString()
  @IsNotEmpty()
  last_name: string;

  @IsEnum(CharacterStatusType)
  status: CharacterStatusType;

  @IsString()
  @IsNotEmpty()
  state_of_origin: string;

  @IsEnum(CharacterGenderType)
  gender: CharacterGenderType;

  @IsUUID()
  location_id:string
}