export interface IConference {
  id?: number;
  name: string;
  abbreviation: string;
  short_name?: string;
  active: boolean;
  league_id: number;
  external_id?: string;
}
