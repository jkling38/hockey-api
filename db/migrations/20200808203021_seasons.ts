import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('season', t => {
        t.increments('id')
        t.date('start_date').notNullable()
        t.date('end_date').notNullable()
    }).then(() =>
        knex.schema.createTable('season_division_alignment', t => {
            t.integer('season_id')
            t.integer('division_id')
            t.integer('team_id')
            t.primary(['season_id', 'division_id', 'team_id'])
            t.foreign('season_id').references('season.id')
            t.foreign('division_id').references('division.id')
            t.foreign('team_id').references('team.id')
        })
    ).then(() =>
        knex.schema.createTable('season_standings', t => {
            t.increments('id')
            t.integer('team_id')
            t.integer('season_id')
            t.integer('wins')
            t.integer('losses')
            t.integer('shootout_losses')
            t.integer('regulation_or_overtime_wins')
            t.foreign('team_id').references('team.id')
            t.foreign('season_id').references('season.id')
        })
    )
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists('season_division_alignment')
        .then(() =>
            knex.schema.dropTableIfExists('season_standings')
        )
            .then(() =>
                knex.schema.dropTableIfExists('season')
            );

}

