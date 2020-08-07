import {IDatabaseConfigurations} from "../types/database";
import appConfig from "./environment";
import {Config} from "knex";

const HockeyDatabaseConnections: IDatabaseConfigurations = {
    test: {
        client: 'pg',
        connection: 'postgres://localhost/test_db',
        migrations: {
            directory: __dirname + '../db/migrations'
        },
        seeds: {
            directory: __dirname + '../db/seeds/test'
        }
    },
    development: {
        client: 'pg',
        connection: 'postgres://hockey:SelenaGomez1.@localhost:5432/hockey',
        migrations: {
            directory: __dirname + '/../db/migrations'
        },
        seeds: {
            directory: __dirname + '/../db/seeds/development'
        }
    },
    production: {
        client: 'pg',
        connection: process.env.DATABASE_URL || '',
        migrations: {
            directory: __dirname + '/../db/migrations'
        },
        seeds: {
            directory: __dirname + '/../db/seeds/production'
        }
    }
}

export const dbConfig:Config<any> = HockeyDatabaseConnections[appConfig.environment];

console.log(dbConfig);

export default dbConfig;