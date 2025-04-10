import { integer, pgTable, varchar, boolean } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  hashedPassword: varchar({ length: 255 }).notNull(),
  isAdmin: boolean().notNull().default(false),
});

export type User = typeof usersTable.$inferSelect
export type UserInsert = typeof usersTable.$inferInsert