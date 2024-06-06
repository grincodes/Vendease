import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from "@nestjs/common";
import { CommentService } from "./Comment.service";
import { CommentDto } from "./dto/Comment.dto";

@Controller("comment")
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post("/")
  async createComment(@Body() dto: CommentDto) {
    return this.commentService.createComment(dto);
  }

  @Delete("/:commentId")
  async deleteLocation(@Param("commentId") commentId) {
    const res = await this.commentService.deleteComment(commentId);
    return res;
  }
}
