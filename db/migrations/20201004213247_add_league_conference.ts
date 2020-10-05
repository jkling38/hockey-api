import * as Knex from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable("league_conference", (t) => {
      t.integer("league_id");
      t.integer("conference_id");
      t.foreign("league_id").references("league.id");
      t.foreign("conference_id").references("conference.id");
    })
    .then(() =>
      knex.schema.createTable("conference_division", (t) => {
        t.integer("conference_id");
        t.integer("division_id");
        t.foreign("conference_id").references("conference.id");
        t.foreign("division_id").references("division.id");
      })
    );
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema
    .dropTableIfExists("conference_division")
    .then(() => knex.schema.dropTableIfExists("league_conference"));
}
