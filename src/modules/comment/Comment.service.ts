import { BadRequestException, Injectable } from "@nestjs/common";
import {
  generateEpisodeCode,
  handleErrorCatch,
} from "src/libs/common/helpers/utils";
import { success } from "src/libs/common/types/response";
import { CommentRepo } from "./repo/Comment.repo";
import { CommentDto } from "./dto/Comment.dto";
import { EpisodeService } from "../episode/Episode.service";

@Injectable()
export class CommentService {
  constructor(
    private readonly episodeService: EpisodeService,
    private readonly commentRepo: CommentRepo
  ) {}

  async createComment(dto: CommentDto) {
    try {
      const episodeExists = await this.episodeService.episodeExists(
        dto.episode_id
      );

      if (!episodeExists) {
        throw new BadRequestException("Invalid Episode Id");
      }

      const res = await this.commentRepo.save(dto);
      return success(res);
    } catch (error) {
      handleErrorCatch(error);
    }
  }

  async findAllCommentByEpisodeId(episodeId: string) {
    try {
      const res = await this.commentRepo.find({
        episode_id: episodeId,
      });
      return success(res);
    } catch (error) {
      handleErrorCatch(error);
    }
  }

  async deleteComment(id: string) {
    try {
      const res = await this.commentRepo.findOneAndDelete({ id });
      return success(res);
    } catch (error) {
      handleErrorCatch(error);
    }
  }
}
