import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedProducts1759962681527 implements MigrationInterface {
  name = 'SeedProducts1759962681527';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO product (name, descripcion, price) VALUES
      ('Naranja', 'Cítrica', 1500),
      ('Limón', 'Cítrico', 1000),
      ('Manzana', 'Dulce y jugosa', 2000);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM product;`);
  }
}
