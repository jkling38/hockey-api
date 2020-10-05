import { Model } from "objection";
import knex from "knex";

import { ISeason } from "../../data/types";
import DbConfig from "../../config/database";

const knexConnection = knex(DbConfig);
Model.knex(knexConnection);

class Season extends Model implements ISeason {
  id?: number | undefined;
  start_date: Date;
  end_date: Date;
  league_id: number;

  static get tableName() {
    return "season";
  }
}

export default Season;
