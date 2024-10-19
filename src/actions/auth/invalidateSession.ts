import { db } from "@/db/db";
import { sessionTable } from "@/db/schemas/sessionTable";
import { eq } from "drizzle-orm";

export async function invalidateSession(sessionId: string): Promise<void> {
  await db.delete(sessionTable).where(eq(sessionTable.id, sessionId));
}
