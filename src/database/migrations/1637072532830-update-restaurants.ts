import {MigrationInterface, QueryRunner} from "typeorm";

export class updateRestaurants1637072532830 implements MigrationInterface {
    name = 'updateRestaurants1637072532830'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`restaurants\` CHANGE \`description\` \`description\` text NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`restaurants\` CHANGE \`description\` \`description\` text NOT NULL`);
    }

}
