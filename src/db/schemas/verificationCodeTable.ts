import { userTable } from "@/db/schemas/userTable";
import { randomUUID } from "crypto";
import { addMinutes } from "date-fns";
import { InferSelectModel } from "drizzle-orm";
import { integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const verificationCodeTable = pgTable("verification_code", {
  id: integer("id")
    .primaryKey()
    .references(() => userTable.id),
  code: text("code").default(randomUUID()).notNull(),

  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "date",
  })
    .default(addMinutes(new Date(), 15))
    .notNull(),
});
export type VerificationCode = InferSelectModel<typeof verificationCodeTable>;