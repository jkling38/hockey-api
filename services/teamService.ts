import Team from "../db/models/team";
import { CreateTeamRequest } from "../data/request/createTeamRequest";
import Franchise from "../db/models/franchise";
import { UpdateTeamRequest } from "../data/request/updateTeamRequest";

export const getTeams = async (): Promise<Team[]> => {
  const teams = await Team.query().where({});
  return teams;
};

export const getTeam = async (id: number): Promise<Team> => {
  return Team.query().findById(id);
};

export const createTeam = async (team: CreateTeamRequest): Promise<Team> => {
  const trx = await Franchise.startTransaction();
  try {
    let franchise: Franchise | null = null;
    let firstYear: number = team.firstYear
      ? team.firstYear
      : new Date().getFullYear();
    if (team.franchiseId) {
      franchise = await Franchise.query()
        .where({
          id: team.franchiseId,
        })
        .first();

      firstYear = (
        await Team.query()
          .where({
            franchise_id: franchise.id,
          })
          .min("first_year")
          .first()
      ).first_year;
    }

    if (!franchise) {
      franchise = await Franchise.query().insertAndFetch({
        team_name: team.name,
      });
    }
    trx.commit();

    return Team.query().insertAndFetch({
      team_name: team.name,
      name: team.name,
      active: true,
      first_year: firstYear,
      franchise_id: franchise ? franchise.id : 0,
      location_name: team.location,
      abbreviation: team.abbreviation,
      short_name: team.shortName,
      public: team.public,
    });
  } catch (e) {
    trx.rollback();
    throw new Error(e);
  }
};

export const updateTeam = async (
  id: number,
  updates: UpdateTeamRequest
): Promise<Team> => {
  const existing = await Team.query().findById(id);

  if (!existing) {
    throw new Error("Team not found");
  }

  console.log(existing);
  const name = updates.name ? updates.name : existing.name;
  const location_name = updates.location
    ? updates.location
    : existing.location_name;
  const updated = {
    ...existing,
    name,
    short_name: updates.shortName ? updates.shortName : existing.short_name,
    location_name,
    team_name: `${location_name} ${name}`,
    active: updates.active !== undefined ? updates.active : existing.active,
    abbreviation: updates.abbreviation
      ? updates.abbreviation
      : existing.abbreviation,
    public: updates.public !== undefined ? updates.public : existing.public,
  };
  console.log(updated);

  return Team.query().updateAndFetchById(id, updated);
};
