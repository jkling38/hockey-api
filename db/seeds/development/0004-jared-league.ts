import * as Knex from "knex";
import {
  populateConferences,
  populateDivisionMappings,
  populateDivisions,
  populateLeague,
  populateSeasons,
} from "../seedUtils";
import {
  ILeague,
  IConference,
  IDivision,
  ISeason,
} from "../../../data/entities";

const seasons: Partial<ISeason>[] = [
  {
    start_date: new Date(2017, 9, 4),
    end_date: new Date(2018, 5, 7),
  },
  {
    start_date: new Date(2018, 9, 3),
    end_date: new Date(2019, 5, 12),
  },
  {
    start_date: new Date(2019, 9, 2),
  },
];

const centralTeamExternalIdsPre2021: string[] = [
  "16",
  "18",
  "19",
  "21",
  "25",
  "30",
  "52",
];
const pacificTeamExternalIdsPre2021: string[] = [
  "20",
  "22",
  "23",
  "24",
  "26",
  "28",
  "53",
  "54",
];
const atlanticTeamExternalIds: string[] = [
  "6",
  "7",
  "8",
  "9",
  "10",
  "13",
  "14",
  "17",
];
const metroTeamExternalIds: string[] = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "12",
  "15",
  "29",
];

export async function seed(knex: Knex): Promise<void> {
  const jaredLeague: ILeague = {
    name: "Jared's League",
    abbreviation: "JHL",
  };

  const league_id = await populateLeague(knex, jaredLeague, {
    name: jaredLeague.name,
  });
  console.log(`League Id: ${league_id}`);

  const conferences: IConference[] = [
    {
      name: "Western Conference",
      abbreviation: "W",
      short_name: "West",
      active: true,
      league_id,
    },
    {
      name: "Eastern Conference",
      abbreviation: "E",
      short_name: "East",
      active: true,
      league_id,
    },
  ];

  const [west, east] = await populateConferences(knex, league_id, conferences, {
    league_id,
  });
  console.log(`Western: ${west}, Eastern: ${east}`);

  const divisions: IDivision[] = [
    {
      name: "Pacific",
      abbreviation: "PAC",
      active: true,
      short_name: "Pacific",
      conference_id: west,
    },
    {
      name: "Central",
      abbreviation: "CEN",
      active: true,
      short_name: "Central",
      conference_id: west,
    },
    {
      name: "Atlantic",
      abbreviation: "ATL",
      active: true,
      short_name: "Atlantic",
      conference_id: east,
    },
    {
      name: "Metropolitan",
      abbreviation: "MET",
      active: true,
      short_name: "Metro",
      conference_id: east,
    },
  ];

  const westernDivisions = divisions.filter((d) => d.conference_id === west);
  const easternDivisions = divisions.filter((d) => d.conference_id === east);

  const [pacific, central] = await populateDivisions(
    knex,
    west,
    westernDivisions,
    { conference_id: west }
  );
  const [atlantic, metro] = await populateDivisions(
    knex,
    east,
    easternDivisions,
    { conference_id: east }
  );

  const seasonIds = await populateSeasons(
    knex,
    seasons.map((s) => {
      return { ...s, league_id };
    }),
    { league_id }
  );

  const divisionMap = [
    {
      division_id: pacific,
      teams: pacificTeamExternalIdsPre2021,
    },
    {
      division_id: central,
      teams: centralTeamExternalIdsPre2021,
    },
    {
      division_id: atlantic,
      teams: atlanticTeamExternalIds,
    },
    {
      division_id: metro,
      teams: metroTeamExternalIds,
    },
  ];
  await populateDivisionMappings(knex, divisionMap, seasonIds);

  console.log(
    `Pacific: ${pacific}, Central: ${central}, Atlantic: ${atlantic}, Metro: ${metro}`
  );
}
