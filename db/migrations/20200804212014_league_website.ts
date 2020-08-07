import * as Knex from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable("league", (t) => {
    t.text("website");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable("league", (t) => {
    t.dropColumn("website");
  });
}
