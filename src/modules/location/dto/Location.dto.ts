import { IsLatitude, IsLongitude, IsNotEmpty, IsString } from "class-validator";

export class LocationDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsLatitude()
  latitude: number;

  @IsLongitude()
  longitude: number;
}
