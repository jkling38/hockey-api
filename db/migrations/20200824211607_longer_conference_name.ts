import * as Knex from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .alterTable("conference", (t) => {
      t.string("name", 70).alter();
    })
    .then(() =>
      knex.schema.alterTable("division", (t) => {
        t.string("name", 70).alter();
      })
    );
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema
    .alterTable("conference", (t) => {
      t.string("name", 30).alter();
    })
    .then(() =>
      knex.schema.alterTable("division", (t) => {
        t.string("name", 30).alter();
      })
    );
}
