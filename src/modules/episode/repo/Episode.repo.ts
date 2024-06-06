import { Injectable } from "@nestjs/common";
import { AbstractRepo } from "src/libs/db/AbstractRepo";
import { Episodes } from "../entity/Episode.model";
import { readConnection } from "src/libs/db/DatabaseModule";

@Injectable()
export class EpisodeRepo extends AbstractRepo<Episodes> {
  constructor() {
    super(Episodes);
  }

  async getEpisodesWithCommentCount(page?: number, size?: number) {
    const pageSize = size ? size : 10;
    const currentPage = page ? page : 1;
    const offset = (currentPage - 1) * pageSize;

    const [episodes, total] = await readConnection
      .getRepository(this.entityTarget)
      .createQueryBuilder("episodes")
      .loadRelationCountAndMap("episodes.commentCount", "episodes.comments")
      .orderBy("release_date", "DESC")
      .skip(offset)
      .take(pageSize)
      .getManyAndCount();

    return {
      episodes,
      total,
      page,
      size,
    };
  }

  async searchEpisodesCharIsFeaturedIn(charName: string) {
   
    const episodes = await await readConnection
      .getRepository(this.entityTarget)
      .createQueryBuilder("episodes")
      .leftJoinAndSelect("episodes.character", "character")
      .where("character.first_name LIKE :charName", {
        charName: `%${charName}%`,
      })
      .getMany();

    return episodes;
  }
}
