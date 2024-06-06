import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateCommentTable1717526876709 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        const tableExist = await queryRunner.hasTable("comments");
        if (!tableExist) {
          await queryRunner.query(
            `CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`
          );
          await queryRunner.createTable(
            new Table({
              name: "comments",
              columns: [
                {
                  name: "id",
                  type: "uuid",
                  isPrimary: true,
                  generationStrategy: "uuid",
                  default: "uuid_generate_v4()",
                },
                {
                  name: "comment",
                  type: "varchar",
                  isNullable: false,
                },

                {
                  name: "ip_address_location",
                  type: "varchar",
                  isNullable: false,
                },


                {
                  name: "episode_id",
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
            "comments",
            new TableForeignKey({
              columnNames: ["episode_id"],
              referencedColumnNames: ["id"],
              referencedTableName: "episodes",
              onDelete: "CASCADE",
            })
          );
        } else {
          console.log("Table comments already exists. Skipping creation.");
        }

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
         await queryRunner.dropTable("comments");
    }

}
