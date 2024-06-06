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
import { Comments } from "src/modules/comment/entity/Comment.model";

@Entity("episodes")
export class Episodes extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column()
  name: string;

  @Column()
  episode_code: string;

  @Column("uuid")
  character_id: string;

  @Column({
    type: "date",
  })
  release_date: Date;

  @ManyToOne(() => Characters, (character) => character.episodes, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "character_id" })
  character?: Characters;

  @OneToMany(() => Comments, (comment) => comment.episode, {
    onDelete: "CASCADE",
  })
  comments?: Comments[];
}
