import { Module } from "@nestjs/common";
import { CharacterRepo } from "./repo/Character.repo";
import { CharacterService } from "./character.service";
import { CharacterController } from "./character.controller";
import { LocationModule } from "../location/Location.module";

@Module({
  imports: [LocationModule],
  providers: [CharacterRepo, CharacterService],
  controllers: [CharacterController],
  exports: [CharacterService],
})
export class CharacterModule {}
