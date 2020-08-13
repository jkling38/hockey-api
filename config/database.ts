import appConfig from "./environment";
import {Config} from "knex";
const configurations = require("../knexfile");

export const dbConfig:Config<any> = configurations[appConfig.environment];

export default dbConfig;