import League from "../db/models/league";
import { QueryBuilder } from "objection";
import Team from "../db/models/team";
import Division from "../db/models/division";
import Season from "../db/models/season";

const eagerLoad = {
  conferences: {
    divisions: {
      teams: true,
    },
  },
};

export const getLeague = async (
  abbreviation?: string
): Promise<QueryBuilder<League, League[]>> => {
  let query = League.query().withGraphFetched(eagerLoad);

  if (abbreviation) {
    query = query.where({
      abbreviation,
    });
  }
  return query;
};

export const getLeagueById = async (id: number): Promise<League> => {
  const latestSeason = (
    await Season.query()
      .where({
        league_id: id,
      })
      .orderBy("start_date", "desc")
      .first()
  ).id;

  const result = League.query()
    .join(
      "season_divison_alignment",
      "league.id",
      "season_division_alignment.league_id"
    )
    .where({
      "league.id": id,
      "season_division_alignment.season_id": latestSeason,
    })
    .first();
  return result;
};

const getTeamById = async (
  leagueId: number,
  _teamId: number
): Promise<Team> => {
  const teamQuery = League.query()
    .joinRelated("conferences.divisions")
    //.where("team.id", "=", teamId)
    .where("league.id", "=", leagueId)
    .select("conferences:divisions.*")
    .castTo(Division);

  const team = await teamQuery.execute();

  console.log(team);

  // @ts-ignore
  return team;
};

export default {
  getLeague,
  getLeagueById,
  getTeamById,
};
