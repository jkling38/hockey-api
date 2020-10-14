import { Router, Request, Response } from "express";
import {
  getTeams,
  createTeam,
  getTeam,
  updateTeam,
  deleteTeam,
} from "../services/teamService";
import { celebrate, Joi, Segments } from "celebrate";
import { CreateTeamRequest } from "../data/request/createTeamRequest";
import { UpdateTeamRequest } from "../data/request/updateTeamRequest";

const router = Router();

router
  .route("/")
  .get(async (_req: Request, res: Response) => {
    const teams = await getTeams();
    res.send(teams);
  })
  .post(
    celebrate({
      [Segments.BODY]: {
        name: Joi.string().required(),
        location: Joi.string().required(),
        abbreviation: Joi.string().required(),
        shortName: Joi.string().required(),
        firstYear: Joi.number(),
        franchiseId: Joi.number(),
        public: Joi.bool(),
      },
    }),
    async (req: Request, res: Response) => {
      const created = await createTeam(req.body as CreateTeamRequest);
      res.send(created);
    }
  );

router
  .route("/:id")
  .all(
    celebrate({
      [Segments.PARAMS]: {
        id: Joi.number().required(),
      },
    })
  )
  .get(async (req: Request, res: Response) => {
    const { id } = req.params;
    const team = await getTeam(Number(id));
    res.send(team);
  })
  .patch(
    celebrate({
      [Segments.BODY]: {
        name: Joi.string(),
        location: Joi.string(),
        active: Joi.bool(),
        abbreviation: Joi.string().required(),
        shortName: Joi.string().required(),
        public: Joi.bool(),
        deleted: Joi.bool(),
      },
    }),
    async (req: Request, res: Response) => {
      const updateRequest = req.body as UpdateTeamRequest;
      const { id } = req.params;

      const updated = await updateTeam(Number(id), updateRequest);

      res.send(updated);
    }
  )
  .delete(async (req: Request, res: Response) => {
    const { id } = req.params;

    await deleteTeam(Number(id));

    res.sendStatus(200);
  });

module.exports = router;
