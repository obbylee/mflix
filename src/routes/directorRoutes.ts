import { Hono } from "hono";
import { prisma } from "../adapters/db";
import { DirectorSchema } from "../types/Director";

const directorRoutes = new Hono();

directorRoutes.get("/", async (c) => {
  try {
    const directors = await prisma.director.findMany();
    return c.json(directors, 200);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return c.json(
        { message: "something went wrong", error: error.message },
        500
      );
    }
    return c.json({ error: "Unknown error" }, 500);
  }
});

directorRoutes.get("/:id", async (c) => {
  try {
    const currentId = c.req.param("id");
    const result = await prisma.director.findUnique({
      where: { id: currentId },
    });

    if (!result) {
      return c.json(
        { message: `Director with '${currentId}' id does not exist!` },
        404
      );
    }

    return c.json(result, 200);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return c.json(
        { message: "something went wrong", error: error.message },
        500
      );
    }
    return c.json({ error: "Unknown error" }, 500);
  }
});

directorRoutes.post("/", async (c) => {
  try {
    const body = await c.req.json();

    const valid = DirectorSchema.safeParse(body);

    if (!valid.success) {
      return c.json({ message: valid.error }, 400);
    }

    const result = await prisma.director.create({ data: valid.data });

    return c.json({ message: "data successfuly updated!", data: result }, 201);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return c.json(
        { message: "something went wrong", error: error.message },
        500
      );
    }
    return c.json({ error: "Unknown error" }, 500);
  }
});

directorRoutes.patch("/:id", async (c) => {
  try {
    const currentId = c.req.param("id");
    const body = await c.req.json();

    const valid = DirectorSchema.safeParse(body);

    if (!valid.success) {
      return c.json({ message: valid.error }, 400);
    }

    const isExist = await prisma.director.findUnique({
      where: { id: currentId },
    });

    if (!isExist) {
      return c.json(
        { message: `Director with '${currentId}' id does not exist!` },
        404
      );
    }

    const result = await prisma.director.update({
      where: { id: currentId },
      data: body,
    });

    return c.json({ message: "data successfuly updated!", data: result }, 201);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return c.json(
        { message: "something went wrong", error: error.message },
        500
      );
    }
    return c.json({ error: "Unknown error" }, 500);
  }
});

directorRoutes.delete("/:id", async (c) => {
  try {
    const currentId = c.req.param("id");

    const isExist = await prisma.director.findUnique({
      where: { id: currentId },
    });

    if (!isExist) {
      return c.json(
        { message: `Director with '${currentId}' id does not exist!` },
        404
      );
    }

    const deleteDirector = await prisma.director.delete({
      where: { id: currentId },
    });

    return c.json(
      { message: "Director successfuly deleted!", data: deleteDirector },
      204
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      return c.json(
        { message: "something went wrong", error: error.message },
        500
      );
    }
    return c.json({ error: "Unknown error" }, 500);
  }
});

export default directorRoutes;
