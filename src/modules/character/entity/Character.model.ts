import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  PrimaryColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
  OneToOne,
} from "typeorm";

import { CharacterGenderType, CharacterStatusType } from "../dto/Character.dto";
import { BaseEntity } from "src/libs/db/BaseEntity";
import { Locations } from "src/modules/location/entity/Location.model";
import { Episodes } from "src/modules/episode/entity/Episode.model";

@Entity("characters")
export class Characters extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column({ type: "enum", enum: CharacterStatusType })
  status: CharacterStatusType;

  @Column()
  state_of_origin: string;

  @Column({ type: "enum", enum: CharacterGenderType })
  gender: CharacterGenderType;

  @Column("uuid")
  location_id: string;

  @OneToOne(() => Locations, (location) => location.character, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "location_id" })
  location?: Locations;

  @OneToMany(() => Episodes, (episode) => episode.character, {
    cascade: true,
  })
  episodes?: Episodes[];
}
