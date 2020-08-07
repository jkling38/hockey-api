import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('conference', t => {
        t.increments('id').primary()
        t.string('name', 30).notNullable()
        t.string('abbreviation', 5)
        t.string('short_name', 15)
        t.boolean('active').defaultTo(false).notNullable()
        t.integer('league_id')
        t.foreign('league_id').references('league.id')
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists('conference');
}

