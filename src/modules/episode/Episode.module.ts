import { Module } from "@nestjs/common";
import { CharacterModule } from "../character/character.module";
import { EpisodeService } from "./Episode.service";
import { EpisodeRepo } from "./repo/Episode.repo";
import { EpisodeController } from "./Episode.controller";

@Module({
  imports: [CharacterModule],
  providers: [EpisodeRepo, EpisodeService],
  controllers: [EpisodeController],
  exports:[EpisodeService]
})
export class EpisodeModule {}
