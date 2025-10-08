import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateProductDescription1759964868021
  implements MigrationInterface
{
  name = 'UpdateProductDescription1759964868021';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX \`IDX_9c7468eb720bdf343e61d6aa3a\` ON \`product\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`product\` CHANGE \`descripcion\` \`description\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`age\` \`age\` int NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`product\` DROP COLUMN \`description\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`product\` ADD \`description\` varchar(255) NOT NULL`,
    );
    // await queryRunner.query(
    //   `ALTER TABLE \`product\` ADD UNIQUE INDEX \`IDX_29a733971f71626611bb3808eb\` (\`description\`)`,
    // );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`product\` DROP INDEX \`IDX_29a733971f71626611bb3808eb\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`product\` DROP COLUMN \`description\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`product\` ADD \`description\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`age\` \`age\` int NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`product\` CHANGE \`description\` \`descripcion\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`IDX_9c7468eb720bdf343e61d6aa3a\` ON \`product\` (\`descripcion\`)`,
    );
  }
}
