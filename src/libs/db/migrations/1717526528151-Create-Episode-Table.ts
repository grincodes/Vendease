import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class CreateEpisodeTable1717526528151 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const tableExist = await queryRunner.hasTable("episodes");
    if (!tableExist) {
      await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);
      await queryRunner.createTable(
        new Table({
          name: "episodes",
          columns: [
            {
              name: "id",
              type: "uuid",
              isPrimary: true,
              generationStrategy: "uuid",
              default: "uuid_generate_v4()",
            },
            {
              name: "name",
              type: "varchar",
              isNullable: false,
            },

            {
              name: "episode_code",
              type: "varchar",
              isNullable: false,
            },

            {
              name: "release_date",
              type: "date",
              isNullable: false,
            },

            {
              name: "character_id",
              type: "uuid",
              isNullable: false,
            },

            {
              name: "created_at",
              type: "timestamptz",
              default: "now()",
            },
            {
              name: "updated_at",
              type: "timestamptz",
              default: "now()",
            },
          ],
        })
      );

      await queryRunner.createForeignKey(
        "episodes",
        new TableForeignKey({
          columnNames: ["character_id"],
          referencedColumnNames: ["id"],
          referencedTableName: "characters",
          onDelete: "CASCADE",
        })
      );
    } else {
      console.log("Table episodes already exists. Skipping creation.");
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("episodes");
  }
}
