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
