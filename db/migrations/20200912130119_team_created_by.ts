import * as Knex from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable("team", (t) => {
    t.binary("created_by").nullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable("team", (t) => {
    t.dropColumn("created_by");
  });
}
