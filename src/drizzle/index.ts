import { drizzle } from "drizzle-orm/libsql"
import * as schema from "@/drizzle/schema"
import { env } from "@/env"

export const db = drizzle(env.DATABASE_URL, {
  schema
})
