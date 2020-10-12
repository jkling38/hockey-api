export interface CreateTeamRequest {
  name: string;
  location: string;
  firstYear?: number;
  abbreviation: string;
  shortName: string;
  franchiseId?: number;
  public: boolean;
}
