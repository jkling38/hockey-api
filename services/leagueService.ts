import League from "../data/models/league";
import {QueryBuilder} from "objection";

const eagerLoad = {
    conferences: {
        divisions: true /*{
            teams: true
        }*/
    }
};

export const getLeague = async (abbreviation?: string):Promise<QueryBuilder<League, League[]>> => {
    let query = League.query().withGraphFetched(eagerLoad);

    if (abbreviation) {
        query = query.where({
            abbreviation
        });
    }
    return query;
}

export const getLeagueById = async (id: number): Promise<QueryBuilder<League,  League>> => {
    return League.query().withGraphFetched(eagerLoad).findById(id);
}

export default {
    getLeague,
    getLeagueById
};