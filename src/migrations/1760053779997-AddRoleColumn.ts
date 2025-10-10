import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddRoleColumn1760053779997 implements MigrationInterface {
  name = 'AddRoleColumn1760053779997';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`rol\` varchar(255) NOT NULL DEFAULT 'user'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`age\` \`age\` int NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`product\` ADD UNIQUE INDEX \`IDX_29a733971f71626611bb3808eb\` (\`description\`)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`product\` DROP INDEX \`IDX_29a733971f71626611bb3808eb\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`age\` \`age\` int NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`rol\``);
  }
}
