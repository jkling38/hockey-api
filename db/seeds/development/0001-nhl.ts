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
  const franchiseMap = franchises.reduce((p, c) => {
    p[c.team_name] = c.id;
    return p;
  }, {});

  const teams = [
    {
      name: "New Jersey Devils",
      abbreviation: "NJD",
      team_name: "Devils",
      location_name: "New Jersey",
      short_name: "New Jersey",
      first_year: 1982,
      active: true,
      external_id: "1",
    },
    {
      name: "New York Islanders",
      abbreviation: "NYI",
      team_name: "Islanders",
      location_name: "New York",
      short_name: "NY Islanders",
      first_year: 1972,
      active: true,
      external_id: "2",
    },
    {
      name: "New York Rangers",
      abbreviation: "NYR",
      team_name: "Rangers",
      location_name: "New York",
      short_name: "NY Rangers",
      first_year: 1926,
      active: true,
      external_id: "3",
    },
    {
      name: "Philadelphia Flyers",
      abbreviation: "PHI",
      team_name: "Flyers",
      location_name: "Philadelphia",
      short_name: "Philadelphia",
      first_year: 1967,
      active: true,
      external_id: "4",
    },
    {
      name: "Pittsburgh Penguins",
      abbreviation: "PIT",
      team_name: "Penguins",
      location_name: "Pittsburgh",
      short_name: "Pittsburgh",
      first_year: 1967,
      active: true,
      external_id: "5",
    },
    {
      name: "Boston Bruins",
      abbreviation: "BOS",
      team_name: "Bruins",
      location_name: "Boston",
      short_name: "Boston",
      first_year: 1924,
      active: true,
      external_id: "6",
    },
    {
      name: "Buffalo Sabres",
      abbreviation: "BUF",
      team_name: "Sabres",
      location_name: "Buffalo",
      short_name: "Buffalo",
      first_year: 1970,
      active: true,
      external_id: "7",
    },
    {
      name: "Montréal Canadiens",
      abbreviation: "MTL",
      team_name: "Canadiens",
      location_name: "Montréal",
      short_name: "Montréal",
      first_year: 1909,
      active: true,
      external_id: "8",
    },
    {
      name: "Ottawa Senators",
      abbreviation: "OTT",
      team_name: "Senators",
      location_name: "Ottawa",
      short_name: "Ottawa",
      first_year: 1990,
      active: true,
      external_id: "9",
    },
    {
      name: "Toronto Maple Leafs",
      abbreviation: "TOR",
      team_name: "Maple Leafs",
      location_name: "Toronto",
      short_name: "Toronto",
      first_year: 1917,
      active: true,
      external_id: "10",
    },
    {
      name: "Carolina Hurricanes",
      abbreviation: "CAR",
      team_name: "Hurricanes",
      location_name: "Carolina",
      short_name: "Carolina",
      first_year: 1979,
      active: true,
      external_id: "12",
    },
    {
      name: "Florida Panthers",
      abbreviation: "FLA",
      team_name: "Panthers",
      location_name: "Florida",
      short_name: "Florida",
      first_year: 1993,
      active: true,
      external_id: "13",
    },
    {
      name: "Tampa Bay Lightning",
      abbreviation: "TBL",
      team_name: "Lightning",
      location_name: "Tampa Bay",
      short_name: "Tampa Bay",
      first_year: 1991,
      active: true,
      external_id: "14",
    },
    {
      name: "Washington Capitals",
      abbreviation: "WSH",
      team_name: "Capitals",
      location_name: "Washington",
      short_name: "Washington",
      first_year: 1974,
      active: true,
      external_id: "15",
    },
    {
      name: "Chicago Blackhawks",
      abbreviation: "CHI",
      team_name: "Blackhawks",
      location_name: "Chicago",
      short_name: "Chicago",
      first_year: 1926,
      active: true,
      external_id: "16",
    },
    {
      name: "Detroit Red Wings",
      abbreviation: "DET",
      team_name: "Red Wings",
      location_name: "Detroit",
      short_name: "Detroit",
      first_year: 1926,
      active: true,
      external_id: "17",
    },
    {
      name: "Nashville Predators",
      abbreviation: "NSH",
      team_name: "Predators",
      location_name: "Nashville",
      short_name: "Nashville",
      first_year: 1997,
      active: true,
      external_id: "18",
    },
    {
      name: "St. Louis Blues",
      abbreviation: "STL",
      team_name: "Blues",
      location_name: "St. Louis",
      short_name: "St Louis",
      first_year: 1967,
      active: true,
      external_id: "19",
    },
    {
      name: "Calgary Flames",
      abbreviation: "CGY",
      team_name: "Flames",
      location_name: "Calgary",
      short_name: "Calgary",
      first_year: 1980,
      active: true,
      external_id: "20",
    },
    {
      name: "Colorado Avalanche",
      abbreviation: "COL",
      team_name: "Avalanche",
      location_name: "Colorado",
      short_name: "Colorado",
      first_year: 1979,
      active: true,
      external_id: "21",
    },
    {
      name: "Edmonton Oilers",
      abbreviation: "EDM",
      team_name: "Oilers",
      location_name: "Edmonton",
      short_name: "Edmonton",
      first_year: 1979,
      active: true,
      external_id: "22",
    },
    {
      name: "Vancouver Canucks",
      abbreviation: "VAN",
      team_name: "Canucks",
      location_name: "Vancouver",
      short_name: "Vancouver",
      first_year: 1970,
      active: true,
      external_id: "23",
    },
    {
      name: "Anaheim Ducks",
      abbreviation: "ANA",
      team_name: "Ducks",
      location_name: "Anaheim",
      short_name: "Anaheim",
      first_year: 1993,
      active: true,
      external_id: "24",
    },
    {
      name: "Dallas Stars",
      abbreviation: "DAL",
      team_name: "Stars",
      location_name: "Dallas",
      short_name: "Dallas",
      first_year: 1967,
      active: true,
      external_id: "25",
    },
    {
      name: "Los Angeles Kings",
      abbreviation: "LAK",
      team_name: "Kings",
      location_name: "Los Angeles",
      short_name: "Los Angeles",
      first_year: 1967,
      active: true,
      external_id: "26",
    },
    {
      name: "San Jose Sharks",
      abbreviation: "SJS",
      team_name: "Sharks",
      location_name: "San Jose",
      short_name: "San Jose",
      first_year: 1990,
      active: true,
      external_id: "28",
    },
    {
      name: "Columbus Blue Jackets",
      abbreviation: "CBJ",
      team_name: "Blue Jackets",
      location_name: "Columbus",
      short_name: "Columbus",
      first_year: 1997,
      active: true,
      external_id: "29",
    },
    {
      name: "Minnesota Wild",
      abbreviation: "MIN",
      team_name: "Wild",
      location_name: "Minnesota",
      short_name: "Minnesota",
      first_year: 1997,
      active: true,
      external_id: "30",
    },
    {
      name: "Winnipeg Jets",
      abbreviation: "WPG",
      team_name: "Jets",
      location_name: "Winnipeg",
      short_name: "Winnipeg",
      first_year: 2011,
      active: true,
      external_id: "52",
    },
    {
      name: "Arizona Coyotes",
      abbreviation: "ARI",
      team_name: "Coyotes",
      location_name: "Arizona",
      short_name: "Arizona",
      first_year: 1979,
      active: true,
      external_id: "53",
    },
    {
      name: "Vegas Golden Knights",
      abbreviation: "VGK",
      team_name: "Golden Knights",
      location_name: "Vegas",
      short_name: "Vegas",
      first_year: 2016,
      active: true,
      external_id: "54",
    },
  ];

  const teamsWithFranchise = teams.map((t) => {
    return { ...t, franchise_id: franchiseMap[t.team_name] };
  });

  await knex("team").insert(teamsWithFranchise);
}
