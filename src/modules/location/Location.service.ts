import { Injectable } from "@nestjs/common";
import { LocationRepo } from "./repo/Location.repo";
import { LocationDto } from "./dto/Location.dto";
import { handleErrorCatch } from "src/libs/common/helpers/utils";
import { success } from "src/libs/common/types/response";

@Injectable()
export class LocationService {
  constructor(private readonly locationRepo: LocationRepo) {}

  async createLocation(dto: LocationDto) {
    try {
      const res = await this.locationRepo.save(dto);
      return success(res);
    } catch (error) {
      handleErrorCatch(error);
    }
  }

  async findAllLocations(query) {
    try {
      const res = await this.locationRepo.findPaginated(query.size, query.page);
      return res;
    } catch (error) {
      handleErrorCatch(error);
    }
  }

  async deleteLocation(id: string) {
    try {
      const res = await this.locationRepo.findOneAndDelete({ id });
      return success(res);
    } catch (error) {
      handleErrorCatch(error);
    }
  }

  async findLocationById(id) {
    const res = await this.locationRepo.findOne({ id });
    return res;
  }

  async locationExists(id) {
    const locationExists = this.locationRepo.exists({ id });
    return locationExists;
  }
}
