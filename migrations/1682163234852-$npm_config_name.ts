import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1682163234852 implements MigrationInterface {
    name = ' $npmConfigName1682163234852'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "email-urls" ("id" SERIAL NOT NULL, "email_url" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_b8e8a5721bd6d123d3d68334e92" UNIQUE ("email_url"), CONSTRAINT "PK_b9cdfa959b399596ed9dca163f8" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "email-urls"`);
    }

}
