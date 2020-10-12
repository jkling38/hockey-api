import { Model } from "objection";
import knex from "knex";

import { ITeam } from "../../data/entities";
import DbConfig from "../../config/database";

const knexConnection = knex(DbConfig);
Model.knex(knexConnection);

class Team extends Model implements ITeam {
  created_by?: Buffer;
  id?: number | undefined;
  name: string;
  abbreviation: string;
  team_name: string;
  location_name: string;
  short_name: string;
  first_year: number;
  active: boolean;
  franchise_id: number;
  external_id?: string | undefined;

  static get tableName() {
    return "team";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["name", "active"],
      properties: {
        id: {
          type: "integer",
        },
        name: {
          type: "string",
          maxLength: 30,
        },
        abbreviation: {
          type: "string",
          maxLength: 5,
        },
        short_name: {
          type: "string",
          maxLength: 15,
        },
        active: {
          type: "boolean",
        },
        external_id: {
          type: ["string", "null"],
          maxLength: 255,
          nullable: true,
        },
      },
    };
  }
}

export default Team;
