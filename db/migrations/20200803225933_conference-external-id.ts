import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.alterTable('conference', t => {
        t.integer('external_id')
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.alterTable('conference', t => {
        t.dropColumn('external_id')
    })
}

