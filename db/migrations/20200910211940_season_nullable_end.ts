import * as Knex from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable("season", (t) => {
    t.date("end_date").nullable().alter();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable("season", (t) => {
    t.date("end_date").notNullable().alter();
  });
}
