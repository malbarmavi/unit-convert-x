import { App } from "@tinyhttp/app";
import { cors } from "@tinyhttp/cors";
import { logger } from "@tinyhttp/logger";
import db from "./currency-db.json" assert { type: "json" };
const app = new App();

app
  .use(logger())
  .use(cors())
  .get("/", (_, res) => {
    res.status(200).send(req.params);
  })
  .get("/live", (req, res) => {
    const { base } = req.query;
    const rate = db.live.find(({ id }) => id == base);

    res.status(200).send({ ...rate });
  })
  .listen(3000);
