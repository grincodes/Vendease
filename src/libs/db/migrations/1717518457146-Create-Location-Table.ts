import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateLocationTable1717518457146 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const tableExist = await queryRunner.hasTable("locations");
    if (!tableExist) {
      await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);
      await queryRunner.createTable(
        new Table({
          name: "locations",
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
              name: "latitude",
              type: "decimal",
              isNullable: false,
            },

            {
              name: "longitude",
              type: "decimal",
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
    } else {
      console.log("Table locations already exists. Skipping creation.");
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("locations");
  }
}
