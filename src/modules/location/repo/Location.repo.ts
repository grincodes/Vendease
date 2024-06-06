import { Injectable } from "@nestjs/common";
import { AbstractRepo } from "src/libs/db/AbstractRepo";
import { Locations } from "../entity/Location.model";

@Injectable()
export class LocationRepo extends AbstractRepo<Locations> {
  constructor() {
    super(Locations);
  }
}
