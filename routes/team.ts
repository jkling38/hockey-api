import { Router, Request, Response } from "express";
import LeagueService from "../services/leagueService";

const router = Router();

router.get("/:leagueId", async function (req: Request, res: Response) {
  const { leagueId } = req.params;

  if (!Number(leagueId)) {
    res.sendStatus(400).end();
  }

  const league = await LeagueService.getLeagueById(Number(leagueId));

  if (!league) {
    res.sendStatus(404).end();
  }

  res.json(league);
});

router.get("/:leagueId/:teamId", async function (req: Request, res: Response) {
  const { leagueId, teamId } = req.params;

  const team = await LeagueService.getTeamById(
    Number(leagueId),
    Number(teamId)
  );

  if (!team) {
    res.sendStatus(404).end();
  }

  res.json(team);
});

module.exports = router;
