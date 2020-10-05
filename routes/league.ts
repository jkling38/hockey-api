import { Router, Request, Response } from "express";
const router = Router();
import LeagueService from "../services/leagueService";

/* GET home page. */
router.get("/", async function (_req: Request, res: Response) {
  const leagues = await LeagueService.getLeague();
  res.json(leagues);
});

router.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!Number(id)) {
    res.sendStatus(400).end();
  }

  const league = await LeagueService.getLeagueById(Number(id));

  if (!league) {
    res.sendStatus(404).end();
  }
  res.json(league);
});

module.exports = router;
