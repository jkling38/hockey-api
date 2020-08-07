import * as Knex from "knex";

export async function seed(knex: Knex): Promise<void> {
  const leagueFilter = { abbreviation: "NHL" };
  const existingLeagues = await knex("league").where(leagueFilter).select();
  if (existingLeagues.length !== 1) {
    await knex("league").where(leagueFilter).delete();
    await populateLeagues(knex);
  }

  const nhlId = (await knex("league").where(leagueFilter).first()).id;

  const conferenceFilter = { league_id: nhlId };
  const existingConferences = await knex("conference").where(conferenceFilter);
  if (existingConferences.length !== 2) {
    await knex("conference").where(conferenceFilter).delete();
    await populateNHLConferences(knex);
  }

  const existingDivisions = await knex("division")
    .innerJoin("conference", "division.conference_id", "conference.id")
    .where("conference.league_id", nhlId)
    .select("division.id");

  if (existingDivisions.length !== 4) {
    const divisions = existingDivisions.map((d) => d.id);

    await knex("division").whereIn("division.id", divisions).delete();
    await populateNHLDivisions(knex, nhlId);
  }

  const existingFranchises = await knex("franchise").where(conferenceFilter);
  const existingTeams = await knex("team")
    .innerJoin("franchise", "team.franchise_id", "franchise.id")
    .innerJoin("league", "franchise.league_id", "league.id")
    .select("team.id");
  if (existingFranchises.length !== 31) {
    const teams = existingTeams.map((t) => t.id);
    await knex("team").whereIn("id", teams).del();
    await knex("franchise").where(conferenceFilter).delete();
    await populateNHLFranchises(knex, nhlId);
  }

  if (existingTeams.length !== 31) {
    const teams = existingTeams.map((t) => t.id);
    await knex("team").whereIn("id", teams).del();

    await populateNHLTeams(knex, nhlId);
  }

  // Inserts seed entries
}

async function populateLeagues(knex: Knex) {
  await knex("league").insert([
    {
      name: "National Hockey League",
      abbreviation: "NHL",
      website: "https://www.nhl.com/",
    },
    // {
    //   name: "American Hockey League",
    //   abbreviation: "AHL",
    //   website: "https://theahl.com/",
    // },
    // {
    //   name: "East Coast Hockey League",
    //   abbreviation: "ECHL",
    //   website: "https://www.echl.com/",
    // },
  ]);
}
async function populateNHLConferences(knex: Knex) {
  const nhlId = (
    await knex("league")
      .where({
        abbreviation: "NHL",
      })
      .select("id")
  )[0].id;

  await knex("conference").insert([
    {
      name: "Western",
      abbreviation: "W",
      short_name: "West",
      active: true,
      league_id: nhlId,
      external_id: "5",
    },
    {
      name: "Eastern",
      abbreviation: "E",
      short_name: "East",
      active: true,
      league_id: nhlId,
      external_id: "6",
    },
  ]);
}
async function populateNHLDivisions(knex: Knex, leagueId: number) {
  const westernId = (
    await knex("conference")
      .where({
        abbreviation: "W",
        league_id: leagueId,
      })
      .select("id")
  )[0].id;
  await knex("division").insert([
    {
      name: "Central",
      abbreviation: "C",
      short_name: "CEN",
      active: true,
      conference_id: westernId,
      external_id: "16",
    },
    {
      name: "Pacific",
      abbreviation: "P",
      short_name: "PAC",
      active: true,
      conference_id: westernId,
      external_id: "15",
    },
  ]);
  const easternId = (
    await knex("conference")
      .where({
        abbreviation: "E",
        league_id: leagueId,
      })
      .select("id")
  )[0].id;
  await knex("division").insert([
    {
      name: "Atlantic",
      abbreviation: "A",
      short_name: "ATL",
      active: true,
      conference_id: easternId,
      external_id: "17",
    },
    {
      name: "Metropolitan",
      abbreviation: "M",
      short_name: "Metro",
      active: true,
      conference_id: easternId,
      external_id: "18",
    },
  ]);
}
async function populateNHLFranchises(knex: Knex, league_id: number) {
  await knex("franchise").insert([
    { league_id, team_name: "Devils", external_id: "23" },
    { league_id, team_name: "Islanders", external_id: "22" },
    { league_id, team_name: "Rangers", external_id: "10" },
    { league_id, team_name: "Flyers", external_id: "16" },
    { league_id, team_name: "Penguins", external_id: "17" },
    { league_id, team_name: "Bruins", external_id: "6" },
    { league_id, team_name: "Sabres", external_id: "19" },
    { league_id, team_name: "Canadiens", external_id: "1" },
    { league_id, team_name: "Senators", external_id: "30" },
    { league_id, team_name: "Maple Leafs", external_id: "5" },
    { league_id, team_name: "Hurricanes", external_id: "26" },
    { league_id, team_name: "Panthers", external_id: "33" },
    { league_id, team_name: "Lightning", external_id: "31" },
    { league_id, team_name: "Capitals", external_id: "24" },
    { league_id, team_name: "Blackhawks", external_id: "11" },
    { league_id, team_name: "Red Wings", external_id: "12" },
    { league_id, team_name: "Predators", external_id: "34" },
    { league_id, team_name: "Blues", external_id: "18" },
    { league_id, team_name: "Flames", external_id: "21" },
    { league_id, team_name: "Avalanche", external_id: "27" },
    { league_id, team_name: "Oilers", external_id: "25" },
    { league_id, team_name: "Canucks", external_id: "20" },
    { league_id, team_name: "Ducks", external_id: "32" },
    { league_id, team_name: "Stars", external_id: "15" },
    { league_id, team_name: "Kings", external_id: "14" },
    { league_id, team_name: "Sharks", external_id: "29" },
    { league_id, team_name: "Blue Jackets", external_id: "36" },
    { league_id, team_name: "Wild", external_id: "37" },
    { league_id, team_name: "Jets", external_id: "35" },
    { league_id, team_name: "Coyotes", external_id: "28" },
    { league_id, team_name: "Golden Knights", external_id: "38" },
  ]);
}
async function populateNHLTeams(knex: Knex, league_id: number) {
  const franchises = await knex("franchise").where({
    league_id,
  });
  const franchiseMap = franchises.reduce((p, c) => {}, {});

  const teams: any = [];

  const teamsWithFranchise = teams.map((t) => {});

  await knex("team").insert(teamsWithFranchise);
}
