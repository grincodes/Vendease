import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { DatabaseModule } from "./libs/db/DatabaseModule";
import { HealthModule } from "./modules/health";
import { LocationModule } from "./modules/location/Location.module";
import { CharacterModule } from "./modules/character/Character.module";
import { EpisodeModule } from "./modules/episode/Episode.module";
import { CommentModule } from "./modules/comment/Comment.module";

@Module({
  imports: [
    DatabaseModule,
    HealthModule,
    LocationModule,
    CharacterModule,
    EpisodeModule,
    CommentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
