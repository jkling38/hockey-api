import League from "../db/models/league";
import { QueryBuilder } from "objection";
import Team from "../db/models/team";
import Division from "../db/models/division";
import { CreateLeagueRequest } from "../data/request/createLeagueRequest";
import { UpdateLeagueRequest } from "../data/request/updateLeagueRequest";
import Season from "../db/models/season";
import { CreateSeasonRequest } from "../data/request/createSeasonRequest";

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
  const result = League.query()
    .leftJoin("season", "league.id", "season.league_id")
    .leftJoin(
      "current_division_alignment",
      "season.id",
      "current_division_alignment.season_id"
    )
    .where({
      "league.id": id,
    })
    .first();
  return result;
};

export const createLeague = async ({
  name,
  website,
  abbreviation,
}: CreateLeagueRequest): Promise<League> => {
  const league = await League.query().insertAndFetch({
    name,
    website,
    abbreviation,
  });

  return league;
};

export const replaceLeague = async (
  id: number,
  { name, website, abbreviation }: UpdateLeagueRequest
): Promise<League> => {
  const league = await League.query().updateAndFetchById(id, {
    name,
    website,
    abbreviation,
  });

  return league;
};

export const startSeason = async (
  leagueId: number,
  createSeasonRequest: CreateSeasonRequest
): Promise<Season> => {
  const { startDate } = createSeasonRequest;
  return Season.query().insertAndFetch({
    league_id: leagueId,
    start_date: startDate,
  });
};

export const endSeason = async (
  leagueId: number,
  seasonId: number,
  endDate: Date
): Promise<void> => {
  await Season.query()
    .patch({
      end_date: endDate,
    })
    .where({
      league_id: leagueId,
      id: seasonId,
    });
};

export const getSeason = async (
  leagueId: number,
  seasonId: number
): Promise<Season> => {
  return Season.query()
    .where({
      league_id: leagueId,
      id: seasonId,
    })
    .first();
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

  // @ts-ignore
  return team;
};

export default {
  getLeague,
  getLeagueById,
  createLeague,
  replaceLeague,
  startSeason,
  endSeason,
  getSeason,
  getTeamById,
};
