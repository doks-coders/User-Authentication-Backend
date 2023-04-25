import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1682072612015 implements MigrationInterface {
    name = ' $npmConfigName1682072612015'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "passwordReset" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "passwordReset"`);
    }

}
