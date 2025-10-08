import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateProductsTable1759962470654 implements MigrationInterface {
  name = 'CreateProductsTable1759962470654';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE \`product\` (
        \`id\` int NOT NULL AUTO_INCREMENT,
        \`name\` varchar(255) NOT NULL,
        \`descripcion\` varchar(255) NOT NULL,
        \`price\` int NOT NULL,
        UNIQUE INDEX \`IDX_9c7468eb720bdf343e61d6aa3a\` (\`descripcion\`),
        PRIMARY KEY (\`id\`)
      ) ENGINE=InnoDB
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX \`IDX_9c7468eb720bdf343e61d6aa3a\` ON \`product\``,
    );
    await queryRunner.query(`DROP TABLE \`product\``);
  }
}
