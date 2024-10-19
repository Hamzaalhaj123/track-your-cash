import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/db/schemas/*",
  out: "./src/db/generated",
  dbCredentials: {
    url: process.env.DATABASE_URL as string,
  },
});
