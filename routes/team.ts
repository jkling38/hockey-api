import { Router, Request, Response } from 'express';
import LeagueService from "../services/leagueService";

const router = Router();

/* GET home page. */
router.get('/:leagueId', async function(req : Request, res : Response) {
    const { leagueId } = req.params;
    if (!Number(leagueId)) {
        res.sendStatus(400).end();
    }

    const leagues = await LeagueService.getLeagueById(Number(leagueId));

    const teams = [];

    leagues.conferences


    res.json(teams);
});

module.exports = router;