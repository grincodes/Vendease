import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from "@nestjs/common";
import { EpisodeService } from "./Episode.service";
import { EpisodeDto } from "./dto/Episode.dto";

@Controller("episode")
export class EpisodeController {
  constructor(private readonly episodeService: EpisodeService) {}

  @Post("/")
  async createEpisode(@Body() dto: EpisodeDto) {
    return this.episodeService.createEpisode(dto);
  }

  @Get("/")
  async findAllEpisodes(@Query() query) {
    const res = await this.episodeService.findAllEpisodes(query);
    return res;
  }

  @Get("/search_by_character")
  async search(@Query() query) {
    const res = await this.episodeService.searchEpisodesCharacterFeaturedIn(query)
    return res;
  }

  @Get("/:episodeId")
  async findEpisodeById(@Param("episodeId") episodeId) {
    const res = await this.episodeService.findEpisodeById(episodeId);
    return res;
  }

  @Delete("/:episodeId")
  async deleteLocation(@Param("episodeId") episodeId) {
    const res = await this.episodeService.deleteEpisode(episodeId);
    return res;
  }
}
