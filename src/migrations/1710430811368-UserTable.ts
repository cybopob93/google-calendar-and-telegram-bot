import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class UserTable1710430811368 implements MigrationInterface {
  static TABLE_NAME = "users";
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);
    await queryRunner.createTable(
      new Table({
        name: UserTable1710430811368.TABLE_NAME,
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "uuid",
          },
          {
            name: "email",
            type: "varchar",
            isUnique: true,
          },
          {
            name: "token",
            type: "json",
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(UserTable1710430811368.TABLE_NAME);
  }
}
