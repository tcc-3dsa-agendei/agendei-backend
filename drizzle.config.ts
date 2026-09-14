import type { Config } from "drizzle-kit"
import { env } from "@/env"

export default {
  dialect: "sqlite",
  casing: "snake_case",
  out: "./src/drizzle/migrations",
  schema: "./src/drizzle/schema/**",
  migrations: {
    prefix: "index"
  },
  dbCredentials: {
    url: env.DATABASE_URL
  }
} satisfies Config
