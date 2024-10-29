import { Hono } from "hono";
import { prisma } from "../adapters/db";
import { MovieSchema } from "../types/Movie";

const movieRoutes = new Hono();

movieRoutes.get("/", async (c) => {
  try {
    const movies = await prisma.movie.findMany();
    return c.json(movies, 200);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return c.json(
        { message: "Something went wrong", error: error.message },
        500
      );
    }
    return c.json({ error: "Unknown error" }, 500);
  }
});

movieRoutes.get("/:id", async (c) => {
  try {
    const currentId = c.req.param("id");
    const result = await prisma.movie.findUnique({ where: { id: currentId } });

    if (!result) {
      return c.json(
        { message: `Movie with '${currentId}' id does not exist!` },
        404
      );
    }

    return c.json(result, 200);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return c.json(
        { message: "Something went wrong", error: error.message },
        500
      );
    }
    return c.json({ error: "Unknown error" }, 500);
  }
});

movieRoutes.post("/", async (c) => {
  try {
    const body = await c.req.json();

    const valid = MovieSchema.safeParse(body);

    if (!valid.success) {
      return c.json({ message: valid.error }, 400);
    }

    const { actors, ...rest } = valid.data;

    const actor = await prisma.actor.findMany({
      where: {
        id: { in: [...actors] },
      },
    });

    const movie = await prisma.movie.create({
      data: rest,
    });

    if (actor.length > 0) {
      const mvact = await prisma.movieActors.createMany({
        data: actor.map((val) => {
          return { movie_id: movie.id, actor_id: val.id };
        }),
      });
    }

    const listActors = await prisma.movieActors.findMany({
      where: { movie_id: movie.id },
    });

    const result = {
      ...movie,
      actors: listActors,
    };

    return c.json({ message: "data successfuly updated!", data: result }, 201);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return c.json(
        { message: "Something went wrong", error: error.message },
        500
      );
    }
    return c.json({ error: "Unknown error" }, 500);
  }
});

movieRoutes.patch("/:id", async (c) => {
  try {
    const currentId = c.req.param("id");
    const body = await c.req.json();

    const valid = MovieSchema.safeParse(body);

    if (!valid.success) {
      return c.json({ message: valid.error }, 400);
    }

    const isExist = await prisma.movie.findUnique({ where: { id: currentId } });

    if (!isExist) {
      return c.json(
        { message: `Movie with '${currentId}' id does not exist!` },
        404
      );
    }

    const { actors, ...moviePayload } = {
      ...body,
      release_date: new Date(body.release_date).toISOString(),
    };

    const result = await prisma.movie.update({
      where: { id: currentId },
      data: moviePayload,
    });

    return c.json({ message: "data successfuly updated!", data: result }, 201);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return c.json(
        { message: "Something went wrong", error: error.message },
        500
      );
    }
    return c.json({ error: "Unknown error" }, 500);
  }
});

movieRoutes.delete("/:id", async (c) => {
  try {
    const currentId = c.req.param("id");

    const isExist = await prisma.movie.findUnique({ where: { id: currentId } });

    if (!isExist) {
      return c.json(
        { message: `Movie with '${currentId}' id does not exist!` },
        404
      );
    }

    const deletedMovieActor = await prisma.movieActors.deleteMany({
      where: { movie_id: currentId },
    });

    const deletedMovie = await prisma.movie.delete({
      where: { id: currentId },
    });

    return c.json(
      { message: "Movie successfuly deleted!", data: deletedMovie },
      204
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      return c.json(
        { message: "Something went wrong", error: error.message },
        500
      );
    }
    return c.json({ error: "Unknown error" }, 500);
  }
});

export default movieRoutes;
