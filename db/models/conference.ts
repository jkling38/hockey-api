import { Model } from "objection";
import knex from "knex";

import { IConference } from "../../data/types";
import DbConfig from "../../config/database";
import Division from "./division";

const knexConnection = knex(DbConfig);
Model.knex(knexConnection);

class Conference extends Model implements IConference {
  id?: number | undefined;
  name: string;
  abbreviation: string;
  short_name?: string | undefined;
  active: boolean;
  league_id: number;
  external_id?: string | undefined;

  static get tableName() {
    return "conference";
  }

  static get relationMappings() {
    return {
      divisions: {
        relation: Model.ManyToManyRelation,
        modelClass: Division,
        join: {
          from: "conference.id",
          through: {
            from: "conference_division.conference_id",
            to: "conference_division.division_id",
          },
          to: "division.id",
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

export default Conference;
