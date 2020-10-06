import * as Knex from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.raw(`
  CREATE VIEW current_division_alignment AS
  WITH recent_season AS (SELECT s.id, dense_rank() OVER (ORDER BY s.start_date DESC) as recency FROM season s)
  SELECT sda.*, s2.league_id
  FROM season_division_alignment sda
  JOIN recent_season rs ON sda.season_id = rs.id
  JOIN season s2 ON rs.id = s2.id
  WHERE rs.recency = 1;`);
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.raw(`
    DROP VIEW current_division_alignment;
    `);
}
