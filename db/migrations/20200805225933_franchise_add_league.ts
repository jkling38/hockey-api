import * as Knex from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable("franchise", (t) => {
    t.integer("league_id");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable("franchise", (t) => {
    t.dropColumn("league_id");
  });
}
