import express from "express";
import { errors } from "celebrate";
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const leagueRouter = require("./routes/league");
const teamRouter = require("./routes/team");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/league", leagueRouter);
app.use("/team", teamRouter);
app.use(errors());

export default app;
