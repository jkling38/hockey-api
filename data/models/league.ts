import { Model } from "objection";
import knex from 'knex';

import DbConfig from "../../config/knexfile";

const knexConnection = knex(DbConfig);
Model.knex(knexConnection)

class League extends Model {
    static get tableName() {
        return 'League'
    }
}

export default League;