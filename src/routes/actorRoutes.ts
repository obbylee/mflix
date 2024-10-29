import { Hono } from "hono";
import { prisma } from "../adapters/db";
import { ActorSchema } from "../types/Actor";

const actorRoutes = new Hono();

actorRoutes.get("/", async (c) => {
  try {
    const getAllActors = await prisma.actor.findMany();
    return c.json(getAllActors, 200);
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

actorRoutes.get("/:id", async (c) => {
  try {
    const currentId = c.req.param("id");
    const result = await prisma.actor.findUnique({ where: { id: currentId } });

    if (!result) {
      return c.json(
        { message: `Actor with '${currentId}' id does not exist!` },
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

actorRoutes.post("/", async (c) => {
  try {
    const body = await c.req.json();

    const valid = ActorSchema.safeParse(body);

    if (!valid.success) {
      return c.json({ message: valid.error }, 400);
    }

    const createdActor = await prisma.actor.create({ data: valid.data });

    return c.json(
      { message: "data successfuly updated!", data: createdActor },
      201
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

actorRoutes.patch("/:id", async (c) => {
  try {
    const currentId = c.req.param("id");
    const body = await c.req.json();

    const valid = ActorSchema.safeParse(body);

    if (!valid.success) {
      return c.json({ message: valid.error }, 400);
    }

    const isExist = await prisma.actor.findUnique({ where: { id: currentId } });

    if (!isExist) {
      return c.json(
        { message: `Actor with '${currentId}' id does not exist!` },
        404
      );
    }

    const result = await prisma.actor.update({
      where: { id: currentId },
      data: body,
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

actorRoutes.delete("/:id", async (c) => {
  try {
    const currentId = c.req.param("id");

    const isExist = await prisma.actor.findUnique({ where: { id: currentId } });

    if (!isExist) {
      return c.json(
        { message: `Actor with '${currentId}' id does not exist!` },
        404
      );
    }

    const deleteActor = await prisma.actor.delete({ where: { id: currentId } });

    return c.json(
      { message: "Actor successfuly deleted!", data: deleteActor },
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

export default actorRoutes;
