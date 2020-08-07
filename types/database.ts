import {Environment} from "./environment";
import { Config } from "knex";

export interface IPath {
    directory: String
};

export interface IKnexConfig {
    client: String,
    connection: String,
    migrations: IPath,
    seeds: IPath
};

export type IDatabaseConfigurations = {
    [key in Environment]: Config;
};