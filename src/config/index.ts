import app from "./app";
import cors from "./cors";

const env = process.env.NODE_ENV || "development";
const port = process.env.PORT || 3001;

export const config = {
  env,
  port,
  app,
  cors,
};

export default config;
