import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from "@nestjs/common";
import { CharacterService } from "./character.service";
import { CharacterDto } from "./dto/Character.dto";

@Controller("character")
export class CharacterController {
  constructor(private readonly characterService: CharacterService) {}

  @Post("/")
  async createLocation(@Body() dto: CharacterDto) {
    return this.characterService.createCharacter(dto);
  }

  @Get("/")
  async findAllCharacters(@Query() query) {
    const res = await this.characterService.findAllCharacters(query);
    return res;
  }

  @Delete("/:characterId")
  async deleteLocation(@Param("characterId") characterId) {
    const res = await this.characterService.deleteCharacter(characterId);
    return res;
  }
}
