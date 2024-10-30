import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign } from "hono/jwt";
import { signinInput, signupInput } from "@rishabjha/common";

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

userRouter.post("/signup", async (c) => {
  // this is written due to serverless functions:-
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const { success } = signupInput.safeParse(body);
  if (!success) {
    c.status(404);
    return c.json({ error: "Invalid input" });
  }
  try {
    const user = await prisma.user.create({
      data: {
        username: body.username,
        password: body.password,
        name: body.name,
      },
    });

    const token = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json({ jwt: token, id: user.id, name: user.name });
  } catch (err) {
    return c.json({ message: err });
  }
});

userRouter.post("/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const { success } = signinInput.safeParse(body);
  if (!success) {
    c.status(404);
    return c.json({ error: "Invalid input" });
  }
  try {
    const user = await prisma.user.findUnique({
      where: {
        username: body.username,
        password: body.password,
      },
    });

    if (!user) {
      c.status(403);
      return c.json({ error: "user not found" });
    }

    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json({ id: user.id,name:user.name, jwt, data: "sign in successful" });
  } catch (err) {
    return c.json({ message: err });
  }
});

userRouter.get("/:id", async (c) => {
  console.log("hello world! from get user from id");
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    // Parse user ID from params
    const userId = parseInt(c.req.param("id"));

    // Retrieve user details with Prisma
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    // Handle if user is not found
    if (!user) {
      return c.json({ error: "User not found" }, 404);
    }

    // Return user details as JSON
    return c.json(user);
  } catch (error) {
    console.error(error);
    return c.json(
      { error: "An error occurred while fetching user details" },
      500
    );
  }
});


userRouter.delete('/bulk', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    // Delete all blogs from the database
    const deleteResult = await prisma.user.deleteMany();

    // Optionally, return a success message or the number of deleted records
    return c.json({
      message: 'All blogs deleted successfully',
      count: deleteResult.count,
    });
  } catch (err) {
    console.error(err);
    return c.json({ message: 'Error while deleting blogs', error: err.message }, 500);
  }
});