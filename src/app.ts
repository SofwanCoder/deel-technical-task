import { config as dotEnvConfig } from "dotenv";
dotEnvConfig();
import * as bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import methodOverride from "method-override";
import morgan from "morgan";
import { routerBase } from "./routes";
import errorMiddleware from "./middlewares/errorHandler";

export const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(morgan("dev"));
app.use(cookieParser());

app.use(
  helmet({
    contentSecurityPolicy: false,
    frameguard: false,
  })
);
app.disable("x-powered-by");
app.use(methodOverride());

app.use("/", routerBase);
app.use(cors());

app.use(errorMiddleware);
