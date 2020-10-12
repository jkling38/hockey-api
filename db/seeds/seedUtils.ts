import Knex from "knex";
import {
  ILeague,
  IConference,
  IDivision,
  ISeason,
  ISeasonDivisionAlignment,
} from "../../data/entities";

export const populateLeague = async (
  knex: Knex,
  league: ILeague,
  filter: Partial<ILeague>
): Promise<number> => {
  const existingLeagues = await knex("league").where(filter).select();
  let idFromDb = 0;
  if (existingLeagues.length !== 1) {
    await knex("league").where(filter).delete();
    idFromDb = await knex("league").insert(league).returning("id");
  } else {
    idFromDb = await knex("league")
      .where(filter)
      .update(league)
      .returning("id");
  }

  return Number(idFromDb);
};

export const populateConferences = async (
  knex: Knex,
  leagueId: number,
  conferences: IConference[],
  filter: Partial<IConference>
): Promise<number[]> => {
  const existingConferences = await knex("conference").where(filter).select();
  if (existingConferences.length !== conferences.length) {
    const conferencesWithLeague = conferences.map((c) => {
      return {
        ...c,
        league_id: leagueId,
      };
    });
    await knex("conference").where(filter).delete();
    await knex("conference").insert(conferencesWithLeague);
  } else {
    for (const c of conferences) {
      const existing = existingConferences.find((ec) => ec.name === c.name);

      await knex("conference")
        .where({
          id: existing.id,
        })
        .update({ ...existing, ...c });
    }
  }

  const conferenceIds = await knex("conference")
    .where({
      league_id: leagueId,
    })
    .select("id");

  return conferenceIds.map((c) => Number(c.id));
};

export const populateDivisions = async (
  knex: Knex,
  conference_id: number,
  divisions: IDivision[],
  filter: Partial<IDivision>
): Promise<number[]> => {
  const existing = await knex("division").where(filter).select();
  if (existing.length !== divisions.length) {
    await knex("division").where(filter).del();

    await knex("division").insert(
      divisions.map((d) => {
        return {
          ...d,
          conference_id,
        };
      })
    );
  } else {
    for (const d of divisions) {
      await knex("division")
        .where({
          conference_id,
          name: d.name,
        })
        .update({
          ...d,
        });
    }
  }

  const divisionIds = await knex("division")
    .where({
      conference_id,
    })
    .select("id");
  return divisionIds.map((d) => Number(d.id));
};

export const populateSeasons = async (
  knex: Knex,
  seasons: Partial<ISeason>[],
  filter: Partial<ISeason>
): Promise<number[]> => {
  const existing = await knex("season").where(filter);

  if (existing.length !== seasons.length) {
    console.log("Deleting and adding");
    await knex("season").where(filter).del();

    await knex("season").insert(seasons);
  }

  return (await knex("season").where(filter).select("season.id")).map((s) =>
    Number(s.id)
  );
};

export const populateDivisionMappings = async (
  knex: Knex,
  divisionMap: any[],
  seasonIds: number[]
): Promise<void> => {
  const existing = await knex("season_division_alignment")
    .whereIn("season_id", seasonIds)
    .whereIn(
      "division_id",
      divisionMap.map((dm) => dm.division_id)
    );
  const incomingCount = divisionMap.reduce((p, c) => {
    p = c.teams.length;
    return p;
  }, 0);
  if (incomingCount != existing.length) {
    await knex("season_division_alignment")
      .whereIn("season_id", seasonIds)
      .del();

    let data: ISeasonDivisionAlignment[] = [];
    for (let i = 0; i < divisionMap.length; i++) {
      const divisionData = divisionMap[i];
      const teamIdsForDivision = (
        await knex("team")
          .whereIn("external_id", divisionData.teams)
          .select("team.id")
      ).map((t) => Number(t.id));

      for (let j = 0; j < seasonIds.length; j++) {
        const seasonDivisionMap: ISeasonDivisionAlignment[] = teamIdsForDivision.map(
          (team_id) => {
            return {
              division_id: divisionData.division_id,
              season_id: seasonIds[j],
              team_id,
            };
          }
        );
        data = [...data, ...seasonDivisionMap];
      }
    }

    await knex("season_division_alignment").insert(data);
  }
};
