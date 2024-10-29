import { Hono } from "hono";
import { logger } from "hono/logger";
import movieRoutes from "./routes/movieRoutes";
import directorRoutes from "./routes/directorRoutes";
import actorRoutes from "./routes/actorRoutes";

const app = new Hono();

app.use(logger());

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.route("/api/movie", movieRoutes);
app.route("/api/director", directorRoutes);
app.route("/api/actor", actorRoutes);

export default app;
