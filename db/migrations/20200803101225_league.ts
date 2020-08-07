import * as Knex from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("league", (t) => {
    t.increments("id");
    t.string("name", 50).notNullable();
    t.string("abbreviation", 3);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists("league");
}
