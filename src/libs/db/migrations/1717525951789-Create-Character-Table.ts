import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class CreateCharacterTable1717525951789 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const tableExist = await queryRunner.hasTable("characters");
    if (!tableExist) {
      await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);
      await queryRunner.createTable(
        new Table({
          name: "characters",
          columns: [
            {
              name: "id",
              type: "uuid",
              isPrimary: true,
              generationStrategy: "uuid",
              default: "uuid_generate_v4()",
            },
            {
              name: "first_name",
              type: "varchar",
              isNullable: false,
            },

            {
              name: "last_name",
              type: "varchar",
              isNullable: false,
            },

            {
              name: "state_of_origin",
              type: "varchar",
              isNullable: false,
            },

            {
              name: "gender",
              type: "enum",
              enum: ["male", "female"],
            },

            {
              name: "status",
              type: "enum",
              enum: ["active", "dead", "unknown"],
            },

            {
              name: "location_id",
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
        "characters",
        new TableForeignKey({
          columnNames: ["location_id"],
          referencedColumnNames: ["id"],
          referencedTableName: "locations",
          onDelete: "CASCADE",
        })
      );
    } else {
      console.log("Table characters already exists. Skipping creation.");
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("characters");
  }
}
