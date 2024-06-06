import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from "typeorm";

import { BaseEntity } from "src/libs/db/BaseEntity";
import { Characters } from "src/modules/character/entity/Character.model";

@Entity("locations")
export class Locations extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column()
  name: string;

  @Column({type:"numeric"})
  latitude: number;

  @Column({type:"numeric"})
  longitude: number;

  @OneToOne(() => Characters, (character) => character.location, {
    onDelete: "CASCADE",
  })
  character?: Characters;
}
