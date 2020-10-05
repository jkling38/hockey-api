import { Model } from "objection";
import knex from "knex";

import { IFranchise } from "../../data/types";
import DbConfig from "../../config/database";

const knexConnection = knex(DbConfig);
Model.knex(knexConnection);

class Franchise extends Model implements IFranchise {
  id?: number | undefined;
  team_name: string;
  external_id?: string | undefined;
  league_id: number;

  static get tableName() {
    return "franchise";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["team_name", "league_id"],
      properties: {
        id: {
          type: "integer",
        },
        team_name: {
          type: "string",
          maxLength: 255,
        },
        external_id: {
          type: "string",
          maxLength: 255,
        },
        league_id: {
          type: "integer",
        },
      },
    };
  }
}

export default Franchise;
