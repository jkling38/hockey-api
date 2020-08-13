import { Model } from "objection";
import knex from 'knex';

import DbConfig from "../../config/database";
import Division from "./division";

const knexConnection = knex(DbConfig);
Model.knex(knexConnection)

class Conference extends Model {
    static get tableName() {
        return 'conference'
    }

    static get relationMappings() {
        return {
            divisions: {
                relation: Model.HasManyRelation,
                modelClass: Division,
                join: {
                    from: "conference.id",
                    to: 'division.conference_id'
                }
            }
        }
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['name', 'active'],
            properties: {
                id: {
                    type: 'integer'
                },
                name: {
                    type: 'string',
                    maxLength: 30
                },
                abbreviation: {
                    type: 'string',
                    maxLength: 5,
                },
                short_name: {
                    type: 'string',
                    maxLength: 15
                },
                active: {
                    type: 'boolean'
                },
                external_id: {
                    type: 'string',
                    maxLength: 255
                }
            }
        }
    }
}

export default Conference;