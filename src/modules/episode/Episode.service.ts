import { BadRequestException, Injectable } from "@nestjs/common";
import {
  generateEpisodeCode,
  handleErrorCatch,
} from "src/libs/common/helpers/utils";
import { success } from "src/libs/common/types/response";
import { EpisodeRepo } from "./repo/Episode.repo";
import { EpisodeDto } from "./dto/Episode.dto";
import { CharacterService } from "../character/character.service";

@Injectable()
export class EpisodeService {
  constructor(
    private readonly characterService: CharacterService,
    private readonly episodeRepo: EpisodeRepo
  ) {}

  async createEpisode(dto: EpisodeDto) {
    try {
      const characterExists = await this.characterService.characterExists(
        dto.character_id
      );

      if (!characterExists) {
        throw new BadRequestException("Invalid Character Id");
      }

      //genereate episode code
      dto.episode_code = generateEpisodeCode();

      const res = await this.episodeRepo.save(dto);
      return success(res);
    } catch (error) {
      handleErrorCatch(error);
    }
  }

  async findAllEpisodes(query) {
    try {
      const res = await this.episodeRepo.getEpisodesWithCommentCount(
        query.page,
        query.size
      );

      return success(res);
    } catch (error) {
      handleErrorCatch(error);
    }
  }

  async findEpisodesByCharacter(characterId: string) {
    const res = await this.episodeRepo.findOne(
      { character_id: characterId },
      {
        character: true,
      }
    );
    return res;
  }

  async searchEpisodesCharacterFeaturedIn(query) {
    const searchQuery = query.search;
    if (!searchQuery || searchQuery == "") {
      throw new BadRequestException("Invalid search query");
    }
    const res = await this.episodeRepo.searchEpisodesCharIsFeaturedIn(
      searchQuery
    );
    return success(res)
  }

  async deleteEpisode(id: string) {
    try {
      const res = await this.episodeRepo.findOneAndDelete({ id });
      return success(res);
    } catch (error) {
      handleErrorCatch(error);
    }
  }

  async findEpisodeById(id) {
    const res = await this.episodeRepo.findOne(
      { id },
      {
        comments: true,
      }
    );

    return success(res);
  }

  async episodeExists(id) {
    const episodeExists = this.episodeRepo.exists({ id });
    return episodeExists;
  }
}
