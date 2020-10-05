import * as Knex from "knex";
/*
//@ts-ignore
const leagueAbbreviation = "EFL";
//@ts-ignore
const conferences = [
  {
    name: "English Football League",
    abbreviation: "EFL",
    short_name: "Football League",
    active: true,
    external_id: "1",
  },
  {
    name: "The Football Association Challenge Cup",
    abbreviation: "FA",
    short_name: "FA Cup",
    active: true,
    external_id: "2",
  },
  {
    name: "EFL Cup",
    abbreviation: "EFLC",
    short_name: "League Cup",
    active: true,
    external_id: "3",
  },
];
//@ts-ignore
const divisions = [
  {
    name: "Premier League",
    abbreviation: "EPL",
    short_name: "Premier League",
    active: true,
    external_id: "1",
  },
  {
    name: "English Football League Championship",
    abbreviation: "EFLC",
    short_name: "Championship",
    active: true,
    external_id: "2",
  },
  {
    name: "English Football League One",
    abbreviation: "EFL1",
    short_name: "League One",
    active: true,
    external_id: "3",
  },
  {
    name: "English Football League Two",
    abbreviation: "EFL2",
    short_name: "League Two",
    active: true,
    external_id: "4",
  },
];
const premierLeagueAllTime = [
  { external_id: "1", team_name: "Arsenal" },
  { external_id: "2", team_name: "Aston Villa" },
  { external_id: "30", team_name: "Barnsley" },
  { external_id: "35", team_name: "Birmingham City" },
  { external_id: "3", team_name: "Blackburn Rovers" },
  { external_id: "44", team_name: "Blackpool" },
  { external_id: "27", team_name: "Bolton Wanderers" },
  { external_id: "127", team_name: "AFC Bournemouth" },
  { external_id: "32", team_name: "Bradford City" },
  { external_id: "131", team_name: "Brighton and Hove Albion" },
  { external_id: "43", team_name: "Burnley" },
  { external_id: "46", team_name: "Cardiff City" },
  { external_id: "31", team_name: "Charlton Athletic" },
  { external_id: "4", team_name: "Chelsea" },
  { external_id: "5", team_name: "Coventry City" },
  { external_id: "6", team_name: "Crystal Palace" },
  { external_id: "28", team_name: "Derby County" },
  { external_id: "7", team_name: "Everton" },
  { external_id: "34", team_name: "Fulham" },
  { external_id: "159", team_name: "Huddersfield Town" },
  { external_id: "41", team_name: "Hull City" },
  { external_id: "8", team_name: "Ipswich Town" },
  { external_id: "9", team_name: "Leeds United" },
  { external_id: "26", team_name: "Leicester City" },
  { external_id: "10", team_name: "Liverpool" },
  { external_id: "11", team_name: "Manchester City" },
  { external_id: "12", team_name: "Manchester United" },
  { external_id: "13", team_name: "Middlesbrough" },
  { external_id: "23", team_name: "Newcastle United" },
  { external_id: "14", team_name: "Norwich City" },
  { external_id: "15", team_name: "Nottingham Forest" },
  { external_id: "16", team_name: "Oldham Athletic" },
  { external_id: "37", team_name: "Portsmouth" },
  { external_id: "17", team_name: "Queens Park Rangers" },
  { external_id: "40", team_name: "Reading" },
  { external_id: "18", team_name: "Sheffield United" },
  { external_id: "19", team_name: "Sheffield Wednesday" },
  { external_id: "20", team_name: "Southampton" },
  { external_id: "42", team_name: "Stoke City" },
  { external_id: "29", team_name: "Sunderland" },
  { external_id: "45", team_name: "Swansea City" },
  { external_id: "24", team_name: "Swindon Town" },
  { external_id: "21", team_name: "Tottenham Hotspur" },
  { external_id: "33", team_name: "Watford" },
  { external_id: "36", team_name: "West Bromwich Albion" },
  { external_id: "25", team_name: "West Ham United" },
  { external_id: "39", team_name: "Wigan Athletic" },
  { external_id: "22", team_name: "Wimbledon" },
  { external_id: "38", team_name: "Wolverhampton Wanderers" },
];
const premierLeague = [
  { team_name: "Arsenal", external_id: "" },
  { team_name: "Aston Villa", external_id: "" },
  { team_name: "AFC Bournemouth", external_id: "" },
  { team_name: "Brighton and Hove Albion", external_id: "" },
  { team_name: "Burnley", external_id: "" },
  { team_name: "Chelsea", external_id: "" },
  { team_name: "Crystal Palace", external_id: "" },
  { team_name: "Everton", external_id: "" },
  { team_name: "Leicester City", external_id: "" },
  { team_name: "Liverpool", external_id: "" },
  { team_name: "Manchester City", external_id: "" },
  { team_name: "Manchester United", external_id: "" },
  { team_name: "Newcastle United", external_id: "" },
  { team_name: "Norwich City", external_id: "" },
  { team_name: "Sheffield United", external_id: "" },
  { team_name: "Southampton", external_id: "" },
  { team_name: "Tottenham Hotspur", external_id: "" },
  { team_name: "Watford", external_id: "" },
  { team_name: "West Ham United", external_id: "" },
  { team_name: "Wolverhampton Wanderers", external_id: "" },
];
let championship = [
  { team_name: "Barnsley", external_id: "barnsley" },
  { team_name: "Birmingham City", external_id: "birmingham-city" },
  {
    team_name: "Blackburn Rovers",
    external_id: "blackburn-rovers",
  },
  { team_name: "Brentford", external_id: "brentford" },
  { team_name: "Bristol City", external_id: "bristol-city" },
  {
    team_name: "Charlton Athletic",
    external_id: "charlton-athletic",
  },
  { team_name: "Cardiff City", external_id: "cardiff-city" },
  { team_name: "Derby County", external_id: "derby-county" },
  { team_name: "Fulham", external_id: "fulham" },
  {
    team_name: "Huddersfield Town",
    external_id: "huddersfield-town",
  },
  { team_name: "Hull City", external_id: "hull-city" },
  { team_name: "Leeds United", external_id: "leeds-united" },
  { team_name: "Luton Town", external_id: "luton-town" },
  { team_name: "Middlesbrough", external_id: "middle sbrough" },
  { team_name: "Millwall", external_id: "millwall" },
  {
    team_name: "Nottingham Forest",
    external_id: "nottingham-forest",
  },
  {
    team_name: "Preston North End",
    external_id: "preston-north-end",
  },
  {
    team_name: "Queens Park Rangers",
    external_id: "queens-park-rangers",
  },
  { team_name: "Reading", external_id: "reading" },
  {
    team_name: "Sheffield Wednesday",
    external_id: "sheffield-wednesday",
  },
  { team_name: "Stoke City", external_id: "stoke-city" },
  { team_name: "Swansea City", external_id: "swansea-city" },
  {
    team_name: "West Bromwich Albion",
    external_id: "west-bromwich-albion",
  },
  { team_name: "Wigan Athletic", external_id: "wigan-athletic" },
];
let leagueOne = [
  {
    team_name: "Accrington Stanley",
    external_id: "accrington-stanley",
  },
  { team_name: "AFC Wimbledon", external_id: "afc-wimbledon" },
  { team_name: "Blackpool", external_id: "blackpool2" },
  {
    team_name: "Bolton Wanderers",
    external_id: "bolton-wanderers",
  },
  { team_name: "Bristol Rovers", external_id: "bristol-rovers" },
  { team_name: "Burton Albion", external_id: "burton-albion" },
  { team_name: "Coventry City", external_id: "coventry-city" },
  {
    team_name: "Doncaster Rovers",
    external_id: "doncaster-rovers",
  },
  { team_name: "Fleetwood Town", external_id: "fleetwood-town" },
  { team_name: "Gillingham", external_id: "gillingham" },
  { team_name: "Ipswich Town", external_id: "ipswich-town" },
  { team_name: "Lincoln City", external_id: "lincoln-city" },
  { team_name: "Milton Keynes Dons", external_id: "mk-dons" },
  { team_name: "Oxford United", external_id: "oxford-united" },
  {
    team_name: "Peterborough United",
    external_id: "peterborough-united",
  },
  { team_name: "Portsmouth", external_id: "portsmouth" },
  { team_name: "Rochdale", external_id: "rochdale" },
  {
    team_name: "Rotherham United",
    external_id: "rotherham-united",
  },
  { team_name: "Shrewsbury Town", external_id: "shrewsbury-town" },
  { team_name: "Southend United", external_id: "southend-united" },
  { team_name: "Sunderland", external_id: "sunderland" },
  { team_name: "Tranmere Rovers", external_id: "tranmere-rovers" },
  {
    team_name: "Wycombe Wanderers",
    external_id: "wycombe-wanderers",
  },
];
let leagueTwo = [
  { team_name: "Bradford City", external_id: "bradford-city" },
  {
    team_name: "Cambridge United",
    external_id: "cambridge-united",
  },
  { team_name: "Carlisle United", external_id: "carlisle-united" },
  { team_name: "Cheltenham Town", external_id: "cheltenham-town" },
  {
    team_name: "Colchester United",
    external_id: "colchester-united",
  },
  { team_name: "Crawley Town", external_id: "crawley-town" },
  { team_name: "Crewe Alexandra", external_id: "crewe-alexandra" },
  { team_name: "Exeter City", external_id: "exeter-city" },
  {
    team_name: "Forest Green Rovers",
    external_id: "forest-green-rovers",
  },
  { team_name: "Grimsby Town", external_id: "grimsby-town" },
  { team_name: "Leyton Orient", external_id: "leyton-orient" },
  {
    team_name: "Macclesfield Town",
    external_id: "macclesfield-town",
  },
  { team_name: "Mansfield Town", external_id: "mansfield-town" },
  { team_name: "Morecambe", external_id: "morecambe" },
  { team_name: "Newport County", external_id: "newport-county" },
  {
    team_name: "Northampton Town",
    external_id: "northampton-town",
  },
  { team_name: "Oldham Athletic", external_id: "oldham-athletic" },
  { team_name: "Plymouth Argyle", external_id: "plymouth-argyle" },
  { team_name: "Port Vale", external_id: "port-vale" },
  { team_name: "Salford City", external_id: "salford-city" },
  {
    team_name: "Scunthorpe United",
    external_id: "scunthorpe-united",
  },
  { team_name: "Stevenage", external_id: "stevenage" },
  { team_name: "Swindon Town", external_id: "swindon-town" },
  { team_name: "Walsall", external_id: "walsall" },
];

const allDivisions = [premierLeague, championship, leagueOne, leagueTwo];
const allTimeMap = premierLeagueAllTime.reduce((prev: any, current) => {
  prev[current.team_name] = current.external_id;
  return prev;
}, {});
//@ts-ignore
const allTeams = allDivisions.reduce((prev, current) => {
  let updatedCurrent = current.map((c) => {
    if (allTimeMap[c.team_name]) {
      c.external_id = allTimeMap[c.team_name];
    }
    return c;
  });
  return [...prev, ...updatedCurrent];
}, []);
*/
export async function seed(_knex: Knex): Promise<void> {
  /*const leagueFilter = { abbreviation: leagueAbbreviation };
  const existingLeagues = await knex("league").where(leagueFilter).select();
  if (existingLeagues.length !== 1) {
    await knex("league").where(leagueFilter).delete();
    await populateLeagues(knex);
  }

  const eflId = (await knex("league").where(leagueFilter).first()).id;

  const conferenceFilter = { league_id: eflId };
  const existingConferences = await knex("conference").where(conferenceFilter);
  if (existingConferences.length !== conferences.length) {
    await knex("conference").where(conferenceFilter).delete();
    await populateConferences(knex);
  }

  const existingDivisions = await knex("division")
    .innerJoin("conference", "division.conference_id", "conference.id")
    .where("conference.league_id", eflId)
    .select("division.id");

  if (existingDivisions.length !== divisions.length) {
    const divisions = existingDivisions.map((d) => d.id);

    await knex("division").whereIn("division.id", divisions).delete();
    await populateDivisions(knex, eflId);
  }

  const existingFranchises = await knex("franchise").where(conferenceFilter);
  const existingTeams = await knex("team")
    .innerJoin("franchise", "team.franchise_id", "franchise.id")
    .innerJoin("league", "franchise.league_id", "league.id")
    .where("league.id", eflId)
    .select("team.id");
  if (existingFranchises.length !== allTeams.length - 1) {
    const teams = existingTeams.map((t) => t.id);
    await knex("team").whereIn("id", teams).del();
    await knex("franchise").where(conferenceFilter).delete();
    await populateFranchises(knex, eflId);
  }

  if (existingTeams.length !== allTeams.length - 1) {
    const teams = existingTeams.map((t) => t.id);
    await knex("team").whereIn("id", teams).del();

    await populateTeams(knex, eflId);
  }

  // Inserts seed entries

   */
}

/*
async function populateLeagues(knex: Knex) {
  await knex("league").insert([
    {
      name: "English Football League",
      abbreviation: "EFL",
      website: "https://www.efl.com/",
    },
  ]);
}
async function populateConferences(knex: Knex) {
  const leagueId = (
    await knex("league")
      .where({
        abbreviation: leagueAbbreviation,
      })
      .select("id")
  )[0].id;

  const conferencesWithLeagueId = conferences.map((c) => {
    return { ...c, league_id: leagueId };
  });

  await knex("conference").insert(conferencesWithLeagueId);
}
async function populateDivisions(knex: Knex, leagueId: number) {
  const leagueConference = (
    await knex("conference")
      .where({
        abbreviation: "EFL",
        league_id: leagueId,
      })
      .select("id")
  )[0].id;

  const divisionsWithLeagueId = divisions.map((d) => {
    return { ...d, conference_id: leagueConference };
  });
  await knex("division").insert(divisionsWithLeagueId);
  const cups = await knex("conference")
    .where({
      league_id: leagueId,
    })
    .whereNot({
      abbreviation: "EFL",
    })
    .select("id");

  // @ts-ignore
  const cupDivisions = cups.map((c: number) => {
    return {
      name: "Competition",
      abbreviation: "C",
      short_name: "Competition",
      active: true,
      conference_id: c,
      external_id: 1,
    };
  });

  await knex("division").insert(cupDivisions);
}
async function populateFranchises(knex: Knex, league_id: number) {
  await knex("franchise").insert(
    allTeams.map((t) => {
      return { ...t, league_id };
    })
  );
}
async function populateTeams(knex: Knex, league_id: number) {
  const franchises = await knex("franchise").where({
    league_id,
  });
  const franchiseMap = franchises.reduce((p, c) => {
    p[c.team_name] = c.id;
    return p;
  }, {});

  await knex("team").insert(
    allTeams.map((t) => {
      return {
        ...t,
        name: t.team_name,
        location_name: t.team_name,
        franchise_id: franchiseMap[t.team_name],
        active: true,
      };
    })
  );
}
*/
