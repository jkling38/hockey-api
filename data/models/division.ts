import { Model } from "objection";
import knex from 'knex';

import DbConfig from "../../config/database";
//import Team from "./team";

const knexConnection = knex(DbConfig);
Model.knex(knexConnection)

class Division extends Model {
    static get tableName() {
        return 'division'
    }

    /*
    static get relationMappings() {
        return {
            teams: {
                relation: Model.HasManyRelation,
                modelClass: Team,
            }
        }
    }
*/

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

export default Division;