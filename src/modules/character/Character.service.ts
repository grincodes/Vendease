import { BadRequestException, Injectable } from "@nestjs/common";
import { handleErrorCatch } from "src/libs/common/helpers/utils";
import { success } from "src/libs/common/types/response";
import { CharacterRepo } from "./repo/Character.repo";
import { CharacterDto } from "./dto/Character.dto";
import { LocationRepo } from "../location/repo/Location.repo";
import { LocationService } from "../location/Location.service";

@Injectable()
export class CharacterService {
  constructor(
    private readonly locationService: LocationService,
    private readonly characterRepo: CharacterRepo
  ) {}

  async createCharacter(dto: CharacterDto) {
    try {
      const locationExists = await this.locationService.locationExists(
        dto.location_id
      );

      if (!locationExists) {
        throw new BadRequestException("Invalid Location Id");
      }
      const res = await this.characterRepo.save(dto);
      return success(res);
    } catch (error) {
      handleErrorCatch(error);
    }
  }

  async findAllCharacters(query) {
    try {
      const res = await this.characterRepo.findPaginated(
        query.size,
        query.page,
        {
          first_name: query.first_name,
          gender: query.gender,
        },
        {
          created_at: query.sortBy,
        },
        {
          location: true,
        }
      );
      return res;
    } catch (error) {
      handleErrorCatch(error);
    }
  }

  async findCharactersWithEpisodes(query) {
    try {
      const res = await this.characterRepo.findPaginated(
        query.size,
        query.page,
        {
          first_name: query.first_name,
          gender: query.gender,
        },
        {
          created_at: query.sortBy,
        },
        {
          location: true,
        }
      );
      return res;
    } catch (error) {
      handleErrorCatch(error);
    }
  }

  async deleteCharacter(id: string) {
    try {
      const res = await this.characterRepo.findOneAndDelete({ id });
      return success(res);
    } catch (error) {
      handleErrorCatch(error);
    }
  }

  async findCharacterById(id: string) {
    const res = await this.characterRepo.findOne({ id });
    return res;
  }


  async characterExists(id) {
    const locationExists = this.characterRepo.exists({ id });
    return locationExists;
  }

  
}
