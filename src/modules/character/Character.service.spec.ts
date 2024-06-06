import { Test, TestingModule } from "@nestjs/testing";
import { CharacterService } from "./Character.service";
import {
  CharacterDto,
  CharacterGenderType,
  CharacterStatusType,
} from "./dto/Character.dto";

describe("CharacterService", () => {
  let service: CharacterService;

  let validCharProps: CharacterDto = {
    first_name: "ds",
    last_name: "sym",
    status: CharacterStatusType.ACTIVE,
    state_of_origin: "Lagos",
    gender: CharacterGenderType.FEMALE,
    location_id: "3d69210d-cad8-418c-94ac-bdfb39e70ef5",
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CharacterService],
    }).compile();

    service = module.get<CharacterService>(CharacterService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should create a character", async () => {
    const res = await service.createCharacter(validCharProps);
    expect(res.data).toBeDefined();
  });
});
