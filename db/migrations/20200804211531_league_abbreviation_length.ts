import * as Knex from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable("league", (t) => {
    t.string("abbreviation", 5).alter();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable("league", (t) => {
    t.string("abbreviation", 3).alter();
  });
}
