import { createServer } from "http";
import { config as DotEnvConfig } from "dotenv";
DotEnvConfig();
import { onShutdown } from "node-graceful-shutdown";
import { app } from "./app";
import { model } from "./model";
import config from "./config";

const server = createServer(app);

void (async () => {
  await model.sync();
  await import("./scripts/seedDb");
  server.listen(config.port, () =>
    console.info(`Server running on port ${config.port}`)
  );
})();


onShutdown(async () => {
  console.log("Closing http server.");
  await new Promise(resolve => {
    server.close(resolve);
  })
  console.log("Closing Database connection.");
  await model.close();
})
