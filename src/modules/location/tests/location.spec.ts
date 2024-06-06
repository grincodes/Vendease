import { Guard } from "src/libs/domain/logic/Guard";
import { LocationDto } from "../dto/Location.dto";

import "reflect-metadata";

//Test Location Domain Validation
const validProps: LocationDto = {
  name: "Lekki",
  latitude: 6.7,
  longitude: 5.3,
};

const invalidProps: LocationDto = {
  name: "",
  latitude: 600,
  longitude: 809,
};

describe("LocationDomainTest", () => {
  it("should throw error for invalid location props", async () => {
    const guardResult = Guard.validate(LocationDto, invalidProps);
    expect(guardResult.errMsg).toBeDefined();
  });
});
