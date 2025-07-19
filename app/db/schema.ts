import { integer, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";

export const routes = pgTable("routes", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 511 }).notNull(),
  link: varchar({ length: 2047 }).notNull(),
  uses: integer().notNull().default(0),
  createdAt: timestamp().defaultNow(),
  updatedAt: timestamp().defaultNow(),
});
