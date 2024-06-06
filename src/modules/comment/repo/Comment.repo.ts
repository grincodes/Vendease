import { Injectable } from "@nestjs/common";
import { AbstractRepo } from "src/libs/db/AbstractRepo";
import { Comments } from "../entity/Comment.model";
import { readConnection } from "src/libs/db/DatabaseModule";

@Injectable()
export class CommentRepo extends AbstractRepo<Comments> {
  constructor() {
    super(Comments);
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
}
