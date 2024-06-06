import { Module } from "@nestjs/common";
import { CommentService } from "./Comment.service";
import { CommentRepo } from "./repo/Comment.repo";
import { CommentController } from "./Comment.controller";
import { EpisodeModule } from "../episode/Episode.module";

@Module({
  imports: [EpisodeModule],
  providers: [CommentRepo, CommentService],
  controllers: [CommentController],
})
export class CommentModule {}
