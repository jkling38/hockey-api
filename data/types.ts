export interface ILeague {
  id?: number;
  name: string;
  abbreviation: string;
  website?: string;
}

export interface IConference {
  id?: number;
  name: string;
  abbreviation: string;
  short_name?: string;
  active: boolean;
  league_id: number;
  external_id?: string;
}

export interface IDivision {
  id?: number;
  name: string;
  abbreviation: string;
  short_name: string;
  active: boolean;
  external_id?: string;
  conference_id?: number;
}

export interface IFranchise {
  id?: number;
  team_name: string;
  external_id?: string;
  league_id: number;
}

export interface ITeam {
  id?: number;
  name: string;
  abbreviation: string;
  team_name: string;
  location_name: string;
  short_name: string;
  first_year: number;
  active: boolean;
  franchise_id: number;
  external_id?: string;
  created_by?: Buffer;
}

export interface ISeason {
  id?: number;
  start_date: Date;
  end_date: Date;
  league_id: number;
}

export interface ISeasonDivisionAlignment {
  season_id: number;
  division_id: number;
  team_id: number;
}
