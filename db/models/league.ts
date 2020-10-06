import { Model } from "objection";
import knex from "knex";

import { ILeague } from "../../data/types";

import DbConfig from "../../config/database";
import Conference from "./conference";

const knexConnection = knex(DbConfig);
Model.knex(knexConnection);

class League extends Model implements ILeague {
  id?: number | undefined;
  name: string;
  abbreviation: string;
  website?: string | undefined;

  static get tableName() {
    return "league";
  }

  static get relationMappings() {
    return {
      conferences: {
        relation: Model.ManyToManyRelation,
        modelClass: Conference,
        join: {
          from: "league.id",
          through: {
            from: "league_conference.league_id",
            to: "league_conference.conference_id",
          },
          to: "conference.id",
        },
      },
    };
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["name"],
      properties: {
        id: {
          type: "integer",
        },
        name: {
          type: "string",
          maxLength: 50,
        },
        abbreviation: {
          type: "string",
          maxLength: 5,
        },
        website: {
          type: "string",
        },
      },
    };
  }
}

export default League;
