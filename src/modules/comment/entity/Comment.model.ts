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

import { BaseEntity } from "src/libs/db/BaseEntity";
import { Characters } from "src/modules/character/entity/Character.model";
import { Episodes } from "src/modules/episode/entity/Episode.model";

@Entity("comments")
export class Comments extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column({ length: 250 })
  comment: string;

  @Column()
  ip_address_location: string;

  @Column("uuid")
  episode_id: string;

  @ManyToOne(() => Episodes, (episode) => episode.comments)
  @JoinColumn({ name: "episode_id" })
  episode?: Episodes;
}
