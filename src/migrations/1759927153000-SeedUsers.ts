import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedUsers1759927153000 implements MigrationInterface {
  name = 'SeedUsers1759927153000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO user (name, email, password, age) VALUES
      ('Caro', 'caromorales130@gmail.com', '123456789', 29),
      ('Dani', 'dani@gmail.com', '123456789', 33);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DELETE FROM user WHERE email IN ('caromorales130@gmail.com', 'dani@gmail.com');
    `);
  }
}
