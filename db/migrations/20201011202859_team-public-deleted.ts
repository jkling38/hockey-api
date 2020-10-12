import * as Knex from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable("team", (t) => {
    t.boolean("deleted").defaultTo(false).notNullable();
    t.boolean("public").defaultTo(true).notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable("team", (t) => {
    t.dropColumn("deleted");
    t.dropColumn("public");
  });
}
