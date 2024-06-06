import { Module } from "@nestjs/common";
import { LocationRepo } from "./repo/Location.repo";
import { LocationService } from "./Location.service";
import { LocationController } from "./Location.controller";

@Module({
  imports: [],
  providers: [LocationRepo, LocationService],
  controllers: [LocationController],
  exports: [LocationService],
})
export class LocationModule {}
