import { Model } from "objection";
import knex from "knex";

import { IFranchise } from "../../data/entities";
import DbConfig from "../../config/database";

const knexConnection = knex(DbConfig);
Model.knex(knexConnection);

class Franchise extends Model implements IFranchise {
  id?: number | undefined;
  team_name: string;
  external_id?: string | undefined;

  static get tableName() {
    return "franchise";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["team_name"],
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
      },
    };
  }
}

export default Franchise;
