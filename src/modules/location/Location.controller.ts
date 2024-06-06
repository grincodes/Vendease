import { Body, Controller, Delete, Get, Param, Post, Query } from "@nestjs/common";
import { LocationService } from "./Location.service";
import { LocationDto } from "./dto/Location.dto";

@Controller("location")
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Post("/")
  async createLocation(@Body() dto: LocationDto) {
    return this.locationService.createLocation(dto);
  }

  @Get("/")
  async findAllCharacters(@Query() query) {
    const res = await this.locationService.findAllLocations(query);
    return res;
  }
  
  @Delete("/:locationId")
  async deleteLocation(@Param("locationId") locationId) {
    const res = await this.locationService.deleteLocation(locationId);
    return res;
  }
}
