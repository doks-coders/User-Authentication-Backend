import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1681667829464 implements MigrationInterface {
    name = ' $npmConfigName1681667829464'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "passwordVerify" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD "verifiedAccount" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "verifiedAccount"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "passwordVerify"`);
    }

}
