import { userTable } from "@/db/schemas/userTable";
import { InferSelectModel } from "drizzle-orm";
import { integer, pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const roleEnum = pgEnum("role", ["user", "admin"]);
export const sessionTable = pgTable("session", {
  id: text("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => userTable.id),
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
  role: text("role", { enum: ["user", "admin"] })
    .default("user")
    .notNull(),
  // role: text("role").default("user").notNull(),
});
export type Session = InferSelectModel<typeof sessionTable>;
