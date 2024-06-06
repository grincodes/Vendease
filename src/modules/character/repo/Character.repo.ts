import { Injectable } from "@nestjs/common";
import { AbstractRepo } from "src/libs/db/AbstractRepo";
import { Characters } from "../entity/Character.model";

@Injectable()
export class CharacterRepo extends AbstractRepo<Characters> {
  constructor() {
    super(Characters);
  }
}
