import { redirect } from "react-router";
import db from "~/db";
import { routes } from "~/db/schema";
import type { Route } from "./+types/redirect";
import { eq } from "drizzle-orm";

export async function loader({ params }: Route.LoaderArgs) {
  const results = await db
    .select()
    .from(routes)
    .where(eq(routes.name, params.name));
  if (results.length > 0) {
    const result = results[0];
    await db
      .update(routes)
      .set({ uses: result.uses + 1 })
      .where(eq(routes.name, result.name));
    return redirect(result.link, 308);
  }
  return new Response(null, { status: 404 });
}
