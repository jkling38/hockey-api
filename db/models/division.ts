import { Model } from "objection";
import knex from "knex";

import { IDivision } from "../../data/entities";
import DbConfig from "../../config/database";
import Team from "./team";

const knexConnection = knex(DbConfig);
Model.knex(knexConnection);

class Division extends Model implements IDivision {
  id?: number | undefined;
  name: string;
  abbreviation: string;
  short_name: string;
  active: boolean;
  external_id?: string | undefined;
  conference_id?: number | undefined;

  static get tableName() {
    return "division";
  }

  static get relationMappings() {
    return {
      teams: {
        relation: Model.ManyToManyRelation,
        modelClass: Team,
        join: {
          from: "division.id",
          through: {
            from: "current_division_alignment.division_id",
            to: "current_division_alignment.team_id",
          },
          to: "team.id",
        },
      },
    };
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
          type: "string",
          maxLength: 255,
        },
      },
    };
  }
}

export default Division;
