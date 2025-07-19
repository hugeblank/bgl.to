import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import * as schema from "./schema";
import { env } from "~/api/env.server";

const db = drizzle(env.DATABASE_URL, { schema });

console.log(env.DATABASE_URL);
await migrate(db, { migrationsFolder: "./drizzle" });

export default db;
