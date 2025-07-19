import z from "zod";
import { env } from "~/api/env.server";
import db from "~/db";
import { routes } from "~/db/schema";
import type { Route } from "./+types/ln";
import { eq } from "drizzle-orm";

const format = z.object({
  auth: z.string(),
  name: z.string().max(255).min(3),
  link: z.string().max(2047).min(3),
});

export async function action({ request }: Route.ActionArgs) {
  if (request.method === "POST") {
    // console.log(await request.json())
    const { auth, name, link } = format.parse(await request.json());
    if (auth === env.AUTH) {
      const result = await db
        .select()
        .from(routes)
        .where(eq(routes.name, name));
      if (result.length > 0) {
        return new Response(`Name ${name} already exists.`, { status: 400 });
      }
      await db.insert(routes).values({ name, link });
      const url = new URL(request.url);
      return new Response(`https://${url.host}/${name}`, {
        status: 200,
      });
    } else {
      return new Response(null, { status: 401 });
    }
  }
  return new Response(null, { status: 400 });
}
