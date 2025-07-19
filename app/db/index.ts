import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./schema";
import { env } from "~/api/env.server";

export default drizzle(env.DATABASE_URL, { schema });
