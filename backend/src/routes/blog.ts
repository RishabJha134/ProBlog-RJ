import { Hono } from "hono";
import { Prisma, PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign, verify } from "hono/jwt";
import { createBlogInput, updateBlogInput } from "@rishabjha/common";

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

blogRouter.use("/*", async (c, next) => {
  try {
    const authHeader = c.req.header("authorization") || "";

    // If the authorization header is missing, return an unauthorized response
    if (!authHeader) {
      c.status(403);
      return c.json({ message: "Unauthorized: Missing Authorization Header" });
    }

    // Verify the JWT token using the secret
    const user = await verify(authHeader, c.env.JWT_SECRET);
    console.log(user.id)

    // If the token is valid, set the user ID in the context
    if (user) {
      c.set("userId", user.id as string);
      await next(); // Continue to the next middleware or route handler
    } else {
      c.status(403);
      return c.json({ message: "Unauthorized: Invalid Token" });
    }
  } catch (error) {
    // Catch any error during token verification and return an unauthorized response
    c.status(403);
    return c.json({ message: "Unauthorized: Token Verification Failed" });
  }
});

// create a new blog:-
blogRouter.post("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());


  const body = await c.req.json();
  console.log(body);
  const { success } = createBlogInput.safeParse(body);
  if (!success) {
    c.status(404);
    return c.json({ error: "Invalid input" });
  }
  const authorId = c.get("userId");

  const blog = await prisma.blog.create({
    data: {
      title: body.title,
      content: body.content,
      authorId: Number(authorId), // assuming the author is always the first user in the database
    },
  });

  return c.json({
    id: blog.id,
    title: blog.title,
    content: blog.content,
    // author: blog.author, // assuming the author is always the first user in the database
  });

  //   return c.text("post request");
});

//  update a blog:-
blogRouter.put("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const { success } = updateBlogInput.safeParse(body);
  if (!success) {
    c.status(404);
    return c.json({ error: "Invalid input" });
  }
  const blog = await prisma.blog.update({
    where: {
      id: body.id,
    },
    data: {
      title: body.title,
      content: body.content,
    },
  });

  return c.json({
    id: blog.id,
    message: "update blog successfully",
  });
});

// fetch bulk blogs:-
blogRouter.get("/bulk", async (c) => {
  console.log("hello world");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    //   const body = await c.req.json();
    console.log("update blog successfully");
    const blogs = await prisma.blog.findMany({
      select: {
        content: true,
        title: true,
        id: true,
        publish:true,
        author: {
          select: {
            name: true,
          },
        },
      },
    });
    

    return c.json({

      blogs: blogs,
      
    });
  } catch (err) {
    return c.json({ message: "error while fetching the bulk blog" });
  }

  //   return c.text("get request");
});

// get a blog:-
blogRouter.get("/:id", async (c) => {
  const id = c.req.param("id");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    // const body = await c.req.json();

    const blog = await prisma.blog.findFirst({
      where: {
        id: Number(id),
      },
      select: {
        id:true,
        title: true,
        content: true,
        publish:true,
        author: {
          select: {
            name: true,
          },
        },
      },
    });

    return c.json({
      blog,
    });
  } catch (err) {
    return c.json({ message: "error while fetching the blog post" });
  }
});

blogRouter.delete('/bulk', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    // Delete all blogs from the database
    const deleteResult = await prisma.blog.deleteMany();

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

// blogRouter.get("/blog/:id", (c) => {
//   return c.text("get request");
// });
