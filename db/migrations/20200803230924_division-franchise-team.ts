import * as Knex from "knex";

export async function up(knex: Knex): Promise<any> {
  return knex.schema
    .alterTable("conference", (t) => {
      t.string("external_id").alter();
    })
    .then(() =>
      knex.schema.createTable("division", (t) => {
        t.increments("id");
        t.string("name", 30).notNullable();
        t.string("abbreviation", 5);
        t.string("short_name", 15);
        t.boolean("active").notNullable().defaultTo(false);
        t.integer("conference_id");
        t.string("external_id");
        t.foreign("conference_id").references("conference.id");
      })
    )
    .then(() =>
      knex.schema.createTable("franchise", (t) => {
        t.increments("id");
        t.string("team_name");
        t.string("external_id");
      })
    )
    .then(() =>
      knex.schema.createTable("team", (t) => {
        t.increments("id");
        t.string("name", 80).notNullable();
        t.string("abbreviation", 5);
        t.string("team_name", 40).notNullable();
        t.string("location_name", 40).notNullable();
        t.string("short_name", 25);
        t.integer("first_year");
        t.boolean("active").notNullable().defaultTo(false);
        t.integer("franchise_id");
        t.string("external_id");
        t.foreign("franchise_id").references("franchise.id");
      })
    );
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema
    .dropTableIfExists("team")
    .then(() => knex.schema.dropTableIfExists("franchise"))
    .then(() => knex.schema.dropTableIfExists("division"))
    .then(() =>
      knex.schema.alterTable("conference", (t) => {
        t.integer("external_id").alter();
      })
    );
}
