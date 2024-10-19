import { sessionTable } from "@/db/schemas/sessionTable";
import { userTable } from "@/db/schemas/userTable";
import { verificationCodeTable } from "@/db/schemas/verificationCodeTable";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL must exist");
}

// Singleton function to ensure only one db instance is created
function singleton<Value>(name: string, value: () => Value): Value {
  const globalAny: any = global;
  globalAny.__singletons = globalAny.__singletons || {};

  if (!globalAny.__singletons[name]) {
    globalAny.__singletons[name] = value();
  }

  return globalAny.__singletons[name];
}

// Function to create the database connection and apply migrations if needed
function createDatabaseConnection() {
  return drizzle(postgres(process.env.DATABASE_URL as string), {
    schema: { userTable, sessionTable, verificationCodeTable },
  });
}
const db = singleton("db", createDatabaseConnection);

export { db };
// const sql = postgres(process.env.DATABASE_URL as string);
// const db = drizzle(sql);
// export default db;
