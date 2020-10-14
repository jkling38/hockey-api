import { Router, Request, Response } from "express";
const router = Router();
import LeagueService from "../services/leagueService";
import { CreateLeagueRequest } from "../data/request/createLeagueRequest";
import { celebrate, Joi, Segments } from "celebrate";
import { UpdateLeagueRequest } from "../data/request/updateLeagueRequest";
import { CreateSeasonRequest } from "../data/request/createSeasonRequest";

const requireLeagueIdParam = celebrate({
  [Segments.PARAMS]: {
    id: Joi.number().required(),
  },
});

const requireLeagueAndSeasonIdParams = celebrate({
  [Segments.PARAMS]: {
    id: Joi.number().required(),
    seasonId: Joi.number().required(),
  },
});

router
  .route("/")
  .get(async function (_req: Request, res: Response) {
    const leagues = await LeagueService.getLeague();
    res.json(leagues);
  })
  .post(
    celebrate({
      [Segments.BODY]: {
        name: Joi.string().required(),
        abbreviation: Joi.string().required(),
        website: Joi.string(),
      },
    }),
    async (req: Request, res: Response) => {
      const leagueToCreate = req.body as CreateLeagueRequest;
      const league = await LeagueService.createLeague(leagueToCreate);

      res.json(league);
    }
  );

router
  .route("/:id")
  .all(requireLeagueIdParam)
  .get(async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!Number(id)) {
      res.sendStatus(400).end();
    }

    const league = await LeagueService.getLeagueById(Number(id));

    if (!league) {
      res.sendStatus(404).end();
    }
    res.json(league);
  })
  .put(
    celebrate({
      [Segments.BODY]: {
        name: Joi.string().required(),
        abbreviation: Joi.string().required(),
        website: Joi.string(),
      },
    }),
    async (req, res) => {
      const { id } = req.params;
      const leagueUpdate = req.body as UpdateLeagueRequest;
      const league = await LeagueService.replaceLeague(
        Number(id),
        leagueUpdate
      );

      res.json(league);
    }
  );

router
  .route("/:id/season")
  .all(requireLeagueIdParam)
  .get(async (req: Request, res: Response) => {
    // @ts-ignore
    const { id } = req.params;

    res.json([]);
  })
  .post(
    celebrate({
      [Segments.BODY]: {
        startDate: Joi.date().required(),
      },
    }),
    async (req, res) => {
      const { id } = req.params;
      const newSeason = req.body as CreateSeasonRequest;

      const season = await LeagueService.startSeason(Number(id), newSeason);
      res.send(season);
    }
  );

router
  .route("/:id/season/:seasonId")
  .all(requireLeagueAndSeasonIdParams)
  .get(async (req, res) => {
    // @ts-ignore
    const { id, seasonId } = req.params;

    const season = await LeagueService.getSeason(Number(id), Number(seasonId));
    res.send(season);
  })
  .patch(async (req, res) => {
    const { id, seasonId } = req.params;
    const { endDate } = req.body;

    await LeagueService.endSeason(Number(id), Number(seasonId), endDate);

    res.send([]);
  });

module.exports = router;
