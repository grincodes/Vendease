import { Module } from "@nestjs/common";
import { CharacterRepo } from "./repo/Character.repo";
import { CharacterService } from "./Character.service";
import { CharacterController } from "./Character.controller";
import { LocationModule } from "../location/Location.module";

@Module({
  imports: [LocationModule],
  providers: [CharacterRepo, CharacterService],
  controllers: [CharacterController],
  exports: [CharacterService],
})
export class CharacterModule {}
